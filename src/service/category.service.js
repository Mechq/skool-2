const database = require('../database/database.connection');
const logger = require('../util/logger');

const categoryService = {

    getAll: (callback) => {
        logger.info('get all categories');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting categories', err);
                callback(err, null);
                return;
            }

            connection.query(
                'SELECT * FROM category',
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        logger.error('Error getting categories', error);
                        callback(error, null);

                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} categories retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    },
    getCategoryById: (id, callback) => {
        logger.info('get category by id', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting category', err);
                callback(err, null);
                return;
            }

            connection.query(
                'SELECT * FROM category WHERE id = ?',
                [id],
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        logger.error('Error getting category', error);
                        callback(error, null);

                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} category retrieved with id ${id}`,
                            data: results,
                        });
                    }
                }
            )
        });
    }

};

module.exports = categoryService;
