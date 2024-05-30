const database = require('../database/database.connection');
const logger = require('../util/logger');

const commissionService = {
    create: (commission, callback) => {
        logger.info('creating commission', commission);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error creating commission', err);
                callback(err, null);
                return;
            }

            const {
                customerId,
                details,
                targetAudience
            } = commission;

            const values = [customerId, details, targetAudience];

            // TODO: Implement the query to insert correct data
            const query = 'INSERT INTO commission (customerId, details, targetAudience) VALUES (?, ?, ?)';

            logger.debug('query', query);

            connection.query(
                query,
                values,
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error creating commission', error);
                        callback(error, null);

                    } else {
                        // Get the last inserted id for logging
                        const commissionId = results.insertId;
                        logger.trace('commission created', commissionId);

                        const commissionDataWithId = {...commission, Id: commissionId};
                        callback(null, {
                            status: 200,
                            message: 'commission created',
                            data: commissionDataWithId,
                        });
                    }
                }
            )
        });
    },


    getAll: (callback) => {
        logger.info('get all commissions');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting commission', err);
                callback(err, null);
                return;
            }


            connection.query(
                'SELECT * FROM commission',
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error getting commission', error);
                        callback(error, null);

                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} commission retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    }

};

module.exports = commissionService;