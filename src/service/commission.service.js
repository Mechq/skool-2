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
                targetAudience,
                locationId,
            } = commission;

            const values = [customerId, details, targetAudience, locationId];

            // TODO: Implement the query to insert correct data
            const query = 'INSERT INTO commission (customerId, details, targetAudience, locationId) VALUES (?, ?, ?, ?)';

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
    },

    getCommissionById: (id, callback) => {
        logger.info('getting commission by id', id);

        let sql = 'SELECT * FROM commission WHERE id = ?';

        database.query(sql, [id], (error, results, fields) => {
            if (error) {
                logger.error('Error getting commission', error);
                callback(error, null);

            } else {
                if (results.length > 0) {
                    logger.info('Commission fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'Commission fetched successfully',
                        data: results[0],
                    });
                } else {
                    logger.warn('No commission found with id', id);
                    callback({
                        status: 404,
                        message: 'Commission not found',
                    }, null);
                }
            }
        });
    },
    update:
        (commission, commissionId, callback) => {
            logger.info('updating commission', commission);

            let sql = 'UPDATE commission SET ';
            const values = [];

            if (commission.customerId) {
                sql += 'customerId = ?, ';
                values.push(commission.customerId);
            }
            if (commission.details) {
                sql += 'details = ?, ';
                values.push(commission.details);
            }
            if (commission.targetAudience) {
                sql += 'targetAudience = ?, ';
                values.push(commission.targetAudience);
            }
            if (commission.locationId) {
                sql += 'locationId = ?, ';
                values.push(commission.locationId);
            }
            if (commission.date) {
                sql += 'date = ?, ';
                values.push(commission.date);
            }
            // Remove the trailing comma and space
            sql = sql.slice(0, -2);

            sql += ' WHERE id = ?';
            values.push(commissionId);

            database.query(sql, values, (error, results, fields) => {
                if (error) {
                    logger.error('Error updating commission', error);
                    callback(error, null);

                } else {
                    if (results.affectedRows > 0) {
                        logger.info('commission updated successfully');
                        callback(null, 'commission updated successfully');
                    } else {
                        logger.info('No commission found with the provided ID');
                        callback(null, 'No commission found with the provided ID');
                    }
                }
            });
        },

        getCustomer: (commissionId, callback) => {
            logger.info('getting customer by commission id', commissionId);

            let sql = 'SELECT name,id FROM customer WHERE id = (SELECT customerId FROM commission WHERE id = ?)';

            database.query(sql, [commissionId], (error, results, fields) => {
                if (error) {
                    logger.error('Error getting customer', error);
                    callback(error, null);

                } else {
                    if (results.length > 0) {
                        logger.info('Customer fetched successfully', results[0]);
                        callback(null, {
                            status: 200,
                            message: 'Customer fetched successfully',
                            data: results[0],
                        });
                    } else {
                        logger.warn('No customer found with commission id', commissionId);
                        callback({
                            status: 404,
                            message: 'Customer not found',
                        }, null);
                    }
                }
            });
        },
    getStartAndEndTime: (commissionId, callback) => {
        logger.info('getting start and end time by commission id', commissionId);

        // Single query to get the startTime and endTime
        let sql = `
        SELECT time FROM (
            SELECT startTime AS time FROM round WHERE commissionId = ? ORDER BY "order" LIMIT 1
        ) AS start
        UNION ALL
        SELECT time FROM (
            SELECT endTime AS time FROM round WHERE commissionId = ? ORDER BY "order" DESC LIMIT 1
        ) AS end;
    `;

        database.query(sql, [commissionId, commissionId], (error, results) => {
            if (error) {
                logger.error('Error getting start and end time', error);
                return callback(error, null);
            }

            if (results.length < 2) {
                logger.warn('No commission found with id', commissionId);
                return callback({
                    status: 404,
                    message: 'Commission not found',
                }, null);
            }

            const startTime = results[0]?.time;
            const endTime = results[1]?.time;

            logger.info('Start and end time fetched successfully', { startTime, endTime });

            callback(null, {
                status: 200,
                message: 'Start and end time fetched successfully',
                data: { startTime, endTime },
            });
        });
    }


};

module.exports = commissionService;