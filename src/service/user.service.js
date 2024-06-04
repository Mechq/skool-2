const database = require('../database/database.connection');
const logger = require('../util/logger');

const userService = {
    getAll: (callback) => {
        logger.info('retrieving users');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error retrieving users', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT * FROM user';

            logger.debug('query', query);

            connection.query(
                query,
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error retrieving users', error);
                        callback(error, null);
                    } else {
                        logger.trace('users retrieved', results);

                        callback(null, {
                            status: 200,
                            message: 'users retrieved',
                            data: results,
                        });
                    }
                }
            )
        });
    }
};

module.exports = userService;
