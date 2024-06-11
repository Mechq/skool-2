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

            connection.query(`SELECT c.*, w.* FROM commission c JOIN userWorkshop uw ON c.id = uw.commissionId JOIN workshop w ON w.id = uw.workshopId WHERE uw.userId = ?`, [id], 
            function(error, results, fields) {
                connection.release();

                if (error) {
                    logger.error('Error getting workshops', error);
                    callback(error, null);
                    return;
                }

                callback(null, {
                    status: 200,
                    message: `${results.length} workshops retrieved`,
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