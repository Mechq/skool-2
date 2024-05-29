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

    getMailTemplateById: (id, callback) => {
        logger.info('getting mail template by id', id);

        let sql = 'SELECT * FROM mailTemplate WHERE id = ?';

        database.query(sql, [id], (error, results, fields) => {
            if (error) {
                logger.error('Error getting mail template', error);
                callback(error, null);
                return;
            } else {
                if (results.length > 0) {
                    logger.info('Mail template fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'Mail template fetched successfully',
                        data: results[0],
                    });
                } else {
                    logger.warn('No mail template found with id', id);
                    callback({
                        status: 404,
                        message: 'Mail template not found',
                    }, null);
                }
            }
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
                'SELECT subject,cc,details FROM mailTemplate',
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

    update:
        (mailTemplate, mailTemplateId, callback) => {
            logger.info('updating mail template', mailTemplate);

            let sql = 'UPDATE mailTemplate SET ';
            const values = [];

            if (mailTemplate.subject) {
                sql += 'subject = ?, ';
                values.push(mailTemplate.subject);
            }
            if (mailTemplate.cc) {
                sql += 'cc = ?, ';
                values.push(mailTemplate.cc);
            }
            if (mailTemplate.details) {
                sql += 'details = ?, ';
                values.push(mailTemplate.details);
            }

            // Remove the trailing comma and space
            sql = sql.slice(0, -2);

            sql += ' WHERE id = ?';
            values.push(mailTemplate.id);

            database.query(sql, values, (error, results, fields) => {
                if (error) {
                    logger.error('Error updating mail template', error);
                    callback(error, null);
                    return;
                } else {
                    if (results.affectedRows > 0) {
                        logger.info('Mail template updated successfully');
                        callback(null, 'Mail template updated successfully');
                    } else {
                        logger.info('No mail template found with the provided ID');
                        callback(null, 'No mail template found with the provided ID');
                    }
                }
            });

        }

};

module.exports = mailTemplateService;