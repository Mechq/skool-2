const database = require('../database/database.connection');
const logger = require('../util/logger');

const teacherWorkshopQualificationService = {

    getAllByCustomerId: (id, callback) => {
        logger.info('get all teacherWorkshopQualificationService');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting teacherWorkshopQualificationService', err);
                callback(err, null);
                return;
            }

            connection.query(
                'SELECT * FROM workshop WHERE id IN (SELECT workshopId FROM teacherWorkshopQualification WHERE userId = ?)',
                [id],
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        logger.error('Error getting teacherWorkshopQualificationService', error);
                        callback(error, null);

                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} teacherWorkshopQualification retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    },

};

module.exports = teacherWorkshopQualificationService;
