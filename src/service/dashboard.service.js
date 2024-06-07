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

            connection.query('SELECT c., w. FROM commission c JOIN userWorkshop uw ON c.id = uw.commissionId JOIN workshop w ON w.id = uw.workshopId WHERE uw.userId = ?', 
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
    }
};

module.exports = dashboardService;