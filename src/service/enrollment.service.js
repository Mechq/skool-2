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
              "SELECT e.commissionWorkshopId, e.id AS enrollmentId, u.firstName, u.lastName, c.details, c.date, cus.name AS customer, w.name AS workshopName FROM enrollment AS e JOIN user AS u ON e.userId = u.id JOIN commissionWorkshop AS cw ON e.commissionWorkshopId = cw.id JOIN commission AS c ON cw.commissionId = c.id JOIN customer AS cus ON c.customerId = cus.id JOIN workshop AS w ON cw.workshopId = w.id ORDER BY e.commissionWorkshopId;",
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
    }
}

module.exports = enrollmentService;