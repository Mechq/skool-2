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

      const { name, street, housenumber, city, postalcode } = location;

      const values = [name, street, housenumber, city, postalcode];

      const query =
        "INSERT INTO location (name, street, housenumber, city, postalcode) VALUES (?, ?, ?, ?, ?)";

      logger.debug("query", query);

      connection.query(query, values, function (error, results, fields) {
        connection.release();

        if (error) {
          logger.error("Error creating location", error);
          callback(error, null);
          return;
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
            return;
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
        return;
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
};

module.exports = locationService;
