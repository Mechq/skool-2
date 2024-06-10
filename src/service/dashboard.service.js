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
    }
};

module.exports = dashboardService;