const { deleteCommission } = require('../controller/commission.controller');
const database = require('../database/database.connection');
const logger = require('../util/logger');

const commissionService = {
    create: (commission, callback) => {
        logger.info('creating commission', commission);

        database.getConnection((err, connection) => {
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
                grade,
                contactPersonId
            } = commission;

            const values = [customerId, details, targetAudience, locationId, grade, contactPersonId];

            const query = 'INSERT INTO commission (customerId, details, targetAudience, locationId, grade, contactPersonId) VALUES (?, ?, ?, ?, ?, ?)';

            logger.debug('query', query);

            connection.query(query, values, (error, results, fields) => {
                connection.release();

                if (error) {
                    logger.error('Error creating commission', error);
                    callback(error, null);
                } else {
                    const commissionId = results.insertId;
                    logger.trace('commission created', commissionId);

                    const commissionDataWithId = { ...commission, id: commissionId };
                    callback(null, {
                        status: 200,
                        message: 'commission created',
                        data: commissionDataWithId,
                    });
                }
            });
        });
    },

    getAll: (callback) => {
        logger.info('get all commissions');

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error getting commission', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT c.*, cd.date FROM commission c LEFT JOIN commissionDate cd ON c.id = cd.commissionId;';

            connection.query(query, (error, results, fields) => {
                connection.release();

                if (error) {
                    logger.error('Error getting commission', error);
                    callback(error, null);
                } else {
                    callback(null, {
                        status: 200,
                        message: `${results.length} commission retrieved`,
                        data: results,
                    });
                }
            });
        });
    },

    getCommissionById: (id, callback) => {
        logger.info('getting commission by id', id);

        const query = `
    SELECT 
        c.*, 
        GROUP_CONCAT(cd.date ORDER BY cd.date SEPARATOR ', ') AS dates 
    FROM 
        commission c 
    LEFT JOIN 
        commissionDate cd 
    ON 
        c.id = cd.commissionId 
    WHERE 
        c.id = ?
    GROUP BY 
        c.id
`;


        database.query(query, [id], (error, results, fields) => {
            if (error) {
                logger.error('Error getting commission', error);
                callback(error, null);
            } else {
                if (results.length > 0) {
                    logger.info('Commissions fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'Commissions fetched successfully',
                        data: results,
                    });
                } else {
                    logger.warn('No commission found with id', id);
                    callback({
                        status: 404,
                        message: 'Commissions not found',
                    }, null);
                }
            }
        });
    },

    update: (commission, commissionId, callback) => {
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
             if (commission.grade) {
                sql += 'grade = ?, ';
                values.push(commission.grade);
             }
             if (commission.contactPersonId) {
                sql += 'contactPersonId = ?, ';
                values.push(commission.contactPersonId);
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

        const sql = 'SELECT name,id FROM customer WHERE id = (SELECT customerId FROM commission WHERE id = ?)';

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

        const sql = `
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
                    message: 'Commissions not found',
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
    },

    deleteCommission: (id, callback) => {
        logger.info('deleting commission', id);

        const sql = 'DELETE FROM commission WHERE id = ?';

        database.query(sql, [id], (error, results, fields) => {
            if (error) {
                logger.error('Error deleting commission', error);
                callback(error, null);
            } else {
                if (results.affectedRows > 0) {
                    logger.info('commission deleted successfully');
                    callback(null, 'commission deleted successfully');
                } else {
                    logger.info('No commission found with the provided ID');
                    callback(null, 'No commission found with the provided ID');
                }
            }
        });
    },

    getDuration: (callback) => {
        logger.info('getting start and end times for all commissions');

        const sql = `
        SELECT 
            r1.commissionId, 
            r1.startTime AS startTime, 
            r2.endTime AS endTime
        FROM 
            (SELECT commissionId, MIN("order") AS minOrder FROM round GROUP BY commissionId) AS minOrderTable
        JOIN 
            round r1 ON minOrderTable.commissionId = r1.commissionId AND minOrderTable.minOrder = r1."order"
        JOIN 
            (SELECT commissionId, MAX("order") AS maxOrder FROM round GROUP BY commissionId) AS maxOrderTable
        ON 
            minOrderTable.commissionId = maxOrderTable.commissionId
        JOIN 
            round r2 ON maxOrderTable.commissionId = r2.commissionId AND maxOrderTable.maxOrder = r2."order";
        `;

        database.query(sql, (error, results) => {
            if (error) {
                logger.error('Error getting start and end times for all commissions', error);
                return callback(error, null);
            }

            if (results.length === 0) {
                logger.warn('No commissions found');
                return callback({
                    status: 404,
                    message: 'No commissions found',
                }, null);
            }

            // Function to format duration in milliseconds to HH:MM
            const formatDuration = (duration) => {
                const hours = Math.floor(duration / (1000 * 60 * 60));
                const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                return `${hours}h ${minutes}m`;
            };

            // Calculate the duration for each commission
            const commissionsWithDurations = results.map((result) => {
                if (!result.startTime || !result.endTime) {
                    return {
                        ...result,
                        durationMin: null,
                        formattedDuration: null,
                    };
                }

                const [startHour, startMinute] = result.startTime.split(':').map(Number);
                const [endHour, endMinute] = result.endTime.split(':').map(Number);

                const startDate = new Date();
                startDate.setHours(startHour, startMinute, 0, 0);

                const endDate = new Date();
                endDate.setHours(endHour, endMinute, 0, 0);

                const durationMin = (endDate - startDate) / 60000;
                const formattedDuration = formatDuration(endDate - startDate);

                return {
                    ...result,
                    durationMin,
                    formattedDuration
                };
            });

            logger.info('Start and end times fetched successfully for all commissions', commissionsWithDurations);

            callback(null, {
                status: 200,
                message: 'Start and end times fetched successfully for all commissions',
                data: commissionsWithDurations,
            });
        });
    },

    updateCommissionDates: (commissionId, dates, callback) => {
        logger.info('Updating dates for commission', commissionId);

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error getting connection', err);
                callback(err, null);
                return;
            }

            connection.beginTransaction(err => {
                if (err) {
                    logger.error('Error starting transaction', err);
                    connection.release();
                    callback(err, null);
                    return;
                }

                const deleteSql = 'DELETE FROM commissionDate WHERE commissionId = ?';
                connection.query(deleteSql, [commissionId], (error, results) => {
                    if (error) {
                        logger.error('Error deleting dates', error);
                        return connection.rollback(() => {
                            connection.release();
                            callback(error, null);
                        });
                    }

                    if (dates.length === 0) {
                        return connection.commit(commitErr => {
                            if (commitErr) {
                                logger.error('Error committing transaction', commitErr);
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(commitErr, null);
                                });
                            }
                            connection.release();
                            callback(null, {
                                status: 200,
                                message: 'Dates updated successfully',
                                data: []
                            });
                        });
                    }

                    const insertSql = 'INSERT INTO commissionDate (commissionId, date) VALUES ?';
                    const values = dates.map(date => [commissionId, date]);

                    connection.query(insertSql, [values], (error, results) => {
                        if (error) {
                            logger.error('Error inserting dates', error);
                            return connection.rollback(() => {
                                connection.release();
                                callback(error, null);
                            });
                        }

                        connection.commit(commitErr => {
                            if (commitErr) {
                                logger.error('Error committing transaction', commitErr);
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(commitErr, null);
                                });
                            }

                            const insertedDates = dates.map((date, index) => ({
                                commissionId: commissionId,
                                date: date,
                                id: results.insertId + index
                            }));

                            logger.trace('Dates updated', insertedDates);
                            connection.release();
                            callback(null, {
                                status: 200,
                                message: 'Dates updated successfully',
                                data: insertedDates
                            });
                        });
                    });
                });
            });
        });
    },
    getContactPersonByCommissionId: (commissionId, callback) => {
        logger.info('getting contact person by commission id', commissionId);

        const sql = 'SELECT * FROM contactPerson WHERE id = (SELECT contactPersonId FROM commission WHERE id = ?)';

        database.query(sql, [commissionId], (error, results, fields) => {
            if (error) {
                logger.error('Error getting contact person', error);
                callback(error, null);
            } else {
                if (results.length > 0) {
                    logger.info('Contact person fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'Contact person fetched successfully',
                        data: results[0],
                    });
                } else {
                    logger.warn('No contact person found with commission id', commissionId);
                    callback({
                        status: 404,
                        message: 'Contact person not found',
                    }, null);
                }
            }
        });
    }

};

module.exports = commissionService;
