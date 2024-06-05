const database = require("../database/database.connection");
const logger = require("../util/logger");

const teacherWorkshopQualificationService = {
  getAllByCustomerId: (id, callback) => {
    logger.info("get all teacherWorkshopQualificationService");

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error("Error getting teacherWorkshopQualificationService", err);
        callback(err, null);
        return;
      }

      connection.query(
        "SELECT * FROM workshop WHERE id IN (SELECT workshopId FROM teacherWorkshopQualification WHERE userId = ?)",
        [id],
        function (error, results, fields) {
          connection.release();

          if (error) {
            logger.error(
              "Error getting teacherWorkshopQualificationService",
              error
            );
            callback(error, null);
          } else {
            callback(null, {
              status: 200,
              message: `${results.length} teacherWorkshopQualification retrieved`,
              data: results,
            });
          }
        }
      );
    });
  },

  setWorkshops: (workshops, teacherId, callback) => {
    console.log("workshops", workshops);
    console.log("Adding qualification for teacher", teacherId);

      database.getConnection(function (err, connection) {
          if (err) {
              logger.error("Error setting teacherWorkshopQualification", err);
              callback(err, null);
              return;
          }

          const values = [];
          for (const workshopId of workshops) {
              values.push([teacherId, workshopId]);
          }

          connection.query(
              `INSERT INTO teacherWorkshopQualification (userId, workshopId) VALUES ?`,
              [values],
              function (error, results, fields) {
                  connection.release();

                  if (error) {
                      logger.error(
                          "Error setting teacherWorkshopQualification",
                          error
                      );
                      callback(error, null);
                  } else {
                      callback(null, {
                          status: 200,
                          message: "teacherWorkshopQualification set successfully",
                          data: results,
                      });
                  }
              }
          );
      });
  },
    create: (userId, workshopIdsObj, callback) => {
        logger.debug('creating teacherWorkshopQualification', userId, workshopIdsObj);

        // Extract workshopIds array from the object
        const workshopIds = workshopIdsObj.workshopIds;

        // Ensure workshopIds is an array
        let workshopIdList = Array.isArray(workshopIds) ? workshopIds : [workshopIds];
        logger.info(`Number of workshop IDs: ${workshopIdList.length}`);

        // If workshopIdList is empty, return an error
        if (workshopIdList.length === 0) {
            const error = new Error('No workshop IDs provided');
            logger.error('Error creating teacherWorkshopQualification', error);
            callback(error, null);
            return;
        }

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error getting database connection', err);
                callback(err, null);
                return;
            }

            // Build the query
            let sql = 'INSERT INTO teacherWorkshopQualification (userId, workshopId) VALUES ';
            let values = [];
            let placeholders = workshopIdList.map(() => '(?, ?)').join(',');

            // Populate values array with userId and workshopIds
            for (let workshopId of workshopIdList) {
                values.push(userId, workshopId);
            }

            sql += placeholders;

            connection.query(sql, values, (error, results, fields) => {
                connection.release();

                if (error) {
                    logger.error('Error executing query for teacherWorkshopQualification', error);
                    callback(error, null);
                } else {
                    callback(null, {
                        status: 200,
                        message: 'teacherWorkshopQualification created successfully',
                        data: results,
                    });
                }
            });
        });
    }

};
module.exports = teacherWorkshopQualificationService;
