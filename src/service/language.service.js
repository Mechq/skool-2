const logger = require("../util/logger");
const database = require('../database/database.connection');


let languageService = {
    getAll: (callback) => {
        logger.info('Retrieving all languages')

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error connecting to database', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT name FROM language';

            logger.debug('query', query);

            connection.query(
                query,
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error retrieving languages', error);
                        callback(error, null);
                    } else {
                        logger.trace('languages retrieved', results);

                        callback(null, {
                            status: 200,
                            message: 'languages retrieved',
                            data: results,
                        });
                    }
                }
            )
        });
    },

}
    
module.exports = languageService;