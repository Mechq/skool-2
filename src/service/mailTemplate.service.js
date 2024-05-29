const database = require('../database/database.connection');
const logger = require('../util/logger');

const mailTemplateService = {
    create: (mailTemplate, callback) => {
        logger.info('creating mail template', mailTemplate);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error creating mail template', err);
                callback(err, null);
                return;
            }

            const {
                subject,
                cc,
                details
            } = mailTemplate;

            const values = [subject, cc, details];

            // TODO: Implement the query to insert correct data
            const query = 'INSERT INTO mailTemplate (subject, cc, details) VALUES (?, ?, ?)';

            logger.debug('query', query);

            connection.query(
                query,
                values,
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error creating mail template', error);
                        callback(error, null);

                    } else {
                        // Get the last inserted id for logging
                        const mailTemplateId = results.insertId;
                        logger.trace('mail template created', mailTemplateId);

                        const mailTemplateDataWithId = {...mailTemplate, Id: mailTemplateId};
                        callback(null, {
                            status: 200,
                            message: 'mail template created',
                            data: mailTemplateDataWithId,
                        });
                    }
                }
            )
        });
    },


    getAll: (callback) => {
        logger.info('get all mail templates');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting mail templates', err);
                callback(err, null);
                return;
            }


            connection.query(
                'SELECT * FROM mailTemplate',
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error getting mail template', error);
                        callback(error, null);

                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} mail templates retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    },
    getById: (id, callback) => {
        logger.info('getting mail template by id ', id);

        let sql = 'SELECT * FROM mailTemplate WHERE id = ?';

        database.query(sql, [id], (error, results, fields) => {
            if (error) {
                logger.error('Error getting mailTemplate', error);
                callback(error, null);
                return;
            } else {
                if (results.length > 0) {
                    logger.info('mailTemplate fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'mailTemplate fetched successfully',
                        data: results[0],
                    });
                } else {
                    logger.warn('No mailTemplate found with id', id);
                    callback({
                        status: 404,
                        message: 'mailTemplate not found',
                    }, null);
                }
            }
        });
    },

};

module.exports = mailTemplateService;