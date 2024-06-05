const database = require("../database/database.connection");
const logger = require("../util/logger");

const locationService = {
  create: (location, callback) => {
    logger.info("creating location", location);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error("Error creating location", err);
        callback(err, null);
        return;
      }

      const { name, street, houseNumber, city, postalCode, customerId } = location;

      const values = [name, street, houseNumber, city, postalCode, customerId];
      console.log(values);
      const query =
        "INSERT INTO location (name, street, houseNumber, city, postalCode, customerId) VALUES (?, ?, ?, ?, ?, ?)";

      logger.debug("query", query);

      connection.query(query, values, function (error, results, fields) {
        connection.release();

        if (error) {
          logger.error("Error creating location", error);
          callback(error, null);
        } else {
          // Get the last inserted id for logging
          const locationId = results.insertId;
          logger.trace("location created", locationId);

          const locationDataWithId = { ...location, Id: locationId };
          callback(null, {
            status: 200,
            message: "location created",
            data: locationDataWithId,
          });
        }
      });
    });
  },

  getAll: (callback) => {
    logger.info("get all locations");

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error("Error getting locations", err);
        callback(err, null);
        return;
      }

      connection.query(
        "SELECT * FROM location",
        function (error, results, fields) {
          connection.release();

          if (error) {
            logger.error("Error getting locations", error);
            callback(error, null);
          } else {
            callback(null, {
              status: 200,
              message: `${results.length} locations retrieved`,
              data: results,
            });
          }
        }
      );
    });
  },

  getLocationById: (id, callback) => {
    logger.info("getting location by id", id);

    let sql = "SELECT * FROM location WHERE id = ?";

    database.query(sql, [id], (error, results, fields) => {
      if (error) {
        logger.error("Error getting location", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          logger.info("location fetched successfully", results[0]);
          callback(null, {
            status: 200,
            message: "location fetched successfully",
            data: results[0],
          });
        } else {
          logger.warn("No location found with id", id);
          callback(
            {
              status: 404,
              message: "location not found",
            },
            null
          );
        }
      }
    });
  },

  update: (location, locationId, callback) => {
    logger.info("updating location", location);

    let sql = "UPDATE location SET ";
    const values = [];

    if (location.name) {
      sql += "name = ?, ";
      values.push(location.name);
    }
    if (location.street) {
      sql += "street = ?, ";
      values.push(location.street);
    }
    if (location.houseNumber) {
      sql += "houseNumber = ?, ";
      values.push(location.houseNumber);
    }
    if (location.city) {
      sql += "city = ?, ";
      values.push(location.city);
    }
    if (location.postalCode) {
      sql += "postalCode = ?, ";
      values.push(location.postalCode);
    }

    // Remove the trailing comma and space
    sql = sql.slice(0, -2);

    sql += " WHERE id = ?";
    values.push(locationId);

    database.query(sql, values, (error, results, fields) => {
      if (error) {
        logger.error("Error updating location", error);
        callback(error, null);
      } else {
        if (results.affectedRows > 0) {
          logger.info("customer updated successfully");
          callback(null, "customer updated successfully");
        } else {
          logger.info("No customer found with the provided ID");
          callback(null, {
            status: 200,
            message: "location updated successfully",
            data: results,
          });
        }
      }
    });
  },

  getDefaultLocationByCustomerId: (customerId, callback) => {
    logger.debug("customerId", customerId);

    let sql =
      "SELECT name FROM location WHERE id = (SELECT locationId FROM customer WHERE id = ?)";

    database.query(sql, [customerId], (error, results, fields) => {
      if (error) {
        logger.error("Error getting location", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          logger.info("location fetched successfully", results[0]);
          callback(null, {
            status: 200,
            message: "location fetched successfully",
            data: results[0],
          });
        } else {
          logger.warn("No location found with id", id);
          callback(
            {
              status: 404,
              message: "location not found",
            },
            null
          );
        }
      }
    });
  },

  getLocationsByCustomerId: (customerId, callback) => {
    logger.info("getting locations by customer id", customerId);

    let sql = "SELECT * FROM location WHERE customerId = ?";

    database.query(sql, [customerId], (error, results, fields) => {
      if (error) {
        logger.error("Error getting locations", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          logger.info("locations fetched successfully", results);
          callback(null, {
            status: 200,
            message: "locations fetched successfully",
            data: results,
          });
        } else {
          logger.warn("No locations found with customer id", customerId);
          callback(
            {
              status: 404,
              message: "locations not found",
              data: {},
            },
            null
          );
        }
      }
    });
  },

  deleteLocation: (id, callback) => {
    logger.info("deleting location", id);

    let sql = "DELETE FROM location WHERE id = ?";

    database.query(sql, [id], (error, results, fields) => {
      if (error) {
        logger.error("Error deleting location", error);
        callback(error, null);
      } else {
        if (results.affectedRows > 0) {
          logger.info("location deleted successfully");
          callback(null, {
            status: 200,
            message: "location deleted successfully",
          });
        } else {
          logger.info("No location found with the provided ID");
          callback(null, {
            status: 200,
            message: "location deleted successfully",
            data: results,
          });
        }
      }
    });
  }
};

module.exports = locationService;
