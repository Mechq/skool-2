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
    if (!Array.isArray(workshops)) {
        const error = new Error('Invalid input: workshops should be an array');
        logger.error(error.message);
        callback(error, {
            status: 500,
            message: error.message,
        });
        return;
    }

    logger.info('setting teacherWorkshopQualification', teacherId);
    logger.info('WorkshopIds', workshops.map(workshop => workshop.id));

    database.getConnection((err, connection) => {
        if (err) {
            logger.error('Error getting database connection', err);
            callback(err, null);
            return;
        }

        connection.beginTransaction(error => {
            if (error) {
                connection.release();
                logger.error('Error starting transaction', error);
                callback(error, null);
                return;
            }

            connection.query(
                'DELETE FROM teacherWorkshopQualification WHERE userId = ?',
                [teacherId],
                (deleteError, deleteResults) => {
                    if (deleteError) {
                        return connection.rollback(() => {
                            connection.release();
                            logger.error('Error deleting teacherWorkshopQualification', deleteError);
                            callback(deleteError, null);
                        });
                    }

                    const insertValues = workshops.map(workshop => [teacherId, workshop.id]);
                    connection.query(
                        'INSERT INTO teacherWorkshopQualification (userId, workshopId) VALUES ?',
                        [insertValues],
                        (insertError, insertResults) => {
                            if (insertError) {
                                return connection.rollback(() => {
                                    connection.release();
                                    logger.error('Error inserting teacherWorkshopQualification', insertError);
                                    callback(insertError, null);
                                });
                            }

                            connection.commit(commitError => {
                                if (commitError) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        logger.error('Error committing transaction', commitError);
                                        callback(commitError, null);
                                    });
                                }

                                connection.release();
                                callback(null, {
                                    status: 200,
                                    message: 'teacherWorkshopQualification set successfully',
                                });
                            });
                        }
                    );
                }
            );
        });
    });
  }
};
module.exports = teacherWorkshopQualificationService;
