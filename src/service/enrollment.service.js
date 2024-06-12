const logger = require("../util/logger");
const database = require("../database/database.connection");

let enrollmentService = {
    getAllEnrollments: (callback) => {
        logger.info("getting all enrollments");

        database.getConnection(function (err, connection) {
            if (err) {
              logger.error("Error getting enrollments", err);
              callback(err, null);
              return;
            }
      
            connection.query(
              "SELECT e.id as enrollmentId, u.firstName, u.lastName, c.details, c.date, cus.name AS customer, w.name AS workshopName FROM enrollment AS e JOIN user AS u ON e.userId = u.id JOIN commissionWorkshop AS cw ON e.commissionWorkshopId = cw.id JOIN commission AS c ON cw.commissionId = c.id JOIN customer AS cus ON c.customerId = cus.id JOIN workshop AS w ON cw.workshopId = w.id WHERE e.status = 'aangemeld';",
              function (error, results, fields) {
                connection.release();
      
                if (error) {
                  logger.error("Error getting enrollments", error);
                  callback(error, null);
                } else {
                  callback(null, {
                    status: 200,
                    message: `${results.length} enrollments retrieved`,
                    data: results,
                  });
                }
              }
            );
          });
    },

    updateEnrollment: (id, data, callback) => {

        const {
          status
        } = data

        logger.info("updating enrollment", id, status)

        database.getConnection(function (err, connection) {
            if (err) {
              logger.error("Error updating enrollment", err);
              callback(err, null);
              return;
            }
      
            connection.query(
              `UPDATE enrollment SET status = ? WHERE id = ?`,
              [status, id],
              function (error, results, fields) {
                connection.release();
      
                if (error) {
                  logger.error("Error updating enrollment", error);
                  callback(error, null);
                } else {
                  callback(null, {
                    status: 200,
                    message: `Enrollment ${id} updated`,
                    data: results,
                  });
                }
              }
            );
          });
    },

    createEnrollment: (data, callback) => {
        const {
          userId,
          commissionWorkshopId,
          status
        } = data

        logger.info("creating enrollment", userId, commissionWorkshopId, status)

        database.getConnection(function (err, connection) {
            if (err) {
              logger.error("Error creating enrollment", err);
              callback(err, null);
              return;
            }
      
            connection.query(
              `INSERT INTO enrollment (userId, commissionWorkshopId, status) VALUES (?, ?, 'geaccepteerd')`,
              [userId, commissionWorkshopId, status],
              function (error, results, fields) {
                connection.release();
      
                if (error) {
                  logger.error("Error creating enrollment", error);
                  callback(error, null);
                } else {
                  callback(null, {
                    status: 201,
                    message: `Enrollment created`,
                    data: results,
                  });
                }
              }
            );
          });
    }
}

module.exports = enrollmentService;