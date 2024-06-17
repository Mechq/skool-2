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
            connection.query(`SELECT e.id AS enrollmentId, cw.id AS commissionWorkshopId, c.id AS commissionId, w.id AS workshopId, e.*, cw.*, c.*, w.*, cd.date AS commissionDate FROM enrollment e JOIN commissionWorkshop cw ON e.commissionWorkshopId = cw.id JOIN commission c ON cw.commissionId = c.id JOIN workshop w ON cw.workshopId = w.id JOIN commissionDate cd ON c.id = cd.commissionId WHERE e.userId = ? ORDER BY cd.date;`,
                [id],
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