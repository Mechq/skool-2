const database = require('..//database/database.connection');
const { get } = require('../routes/workshop.routes');
const logger = require('../util/logger');

const dashboardService = {
    getWorkshopsCommissionsById: (id, callback) => {
        logger.info('get all commissions by teacher id:', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting commissions', err);
                callback(err, null);
                return;
            }

            connection.query(`SELECT c.*, w.* FROM enrollment e JOIN commissionWorkshop cw ON e.commissionWorkshopId = cw.id JOIN commission c ON cw.commissionId = c.id JOIN workshop w ON cw.workshopId = w.id WHERE e.userId = ?;`, [id], 
            function(error, results, fields) {
                connection.release();

                if (error) {
                    logger.error('Error getting commissions and workshops', error);
                    callback(error, null);
                    return;
                }

                callback(null, {
                    status: 200,
                    message: `${results.length} workshops and commissions retrieved`,
                    data: results,
                });
            });
        });
    },

    deleteEnrollmentById: (id, callback) => {
        logger.info('delete enrollment by id:', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error deleting enrollment', err);
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM enrollment WHERE id = ?', [id], 
            function(error, results, fields) {
                connection.release();

                if (error) {
                    logger.error('Error deleting enrollment', error);
                    callback(error, null);
                    return;
                }

                callback(null, {
                    status: 200,
                    message: `Enrollment with id ${id} deleted`,
                    data: results,
                });
            });
        });
    },

    deleteEnrollmentById: (id, userId, callback) => {
        logger.info('deleting commission by id:', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error deleting commission', err);
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM enrollment WHERE commissionWorkshopId = ? AND userId = ?', [id, userId], 
            function(error, results, fields) {
                connection.release();

                if (error) {
                    logger.error('Error deleting commission', error);
                    callback(error, null);
                    return;
                }

                else {callback(null, {
                    status: 200,
                    message: 'commission deleted',
                    data: {},
                });}
            });
        });
    },
};

module.exports = dashboardService;