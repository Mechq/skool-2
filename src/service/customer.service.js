const database = require('..//database/database.connection');
const logger = require('../util/logger');

const customerService = {
    create: (customer, callback) => {
        logger.info('creating customer', customer);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error creating customer', err);
                callback(err, null);
                return;
            }

            const {
                name,
                contactName,
                email,
                phone,
                locationId,
            } = customer;

            const values = [name, contactName, email, phone, locationId];

            const sql = 'INSERT INTO customer (name, contactName, email, phone, locationId) VALUES (?, ?, ?, ?, ?)';
              connection.query(sql, values, function(error, results, fields) {
                    connection.release();
                    if (error) {
                        logger.error('Error creating customer', error);
                        callback(error, null);
                        return;
                    }
                    const customerId = results.insertId;
                    logger.trace('customer created', customerId);

                    const customerDataWithId = { ...customer, id: customerId };
                    callback(null, {
                        status: 200,
                        message: 'customer created',
                        data: customerDataWithId,
                    });
                });
            });
    },

    getAll: (callback) => {
        logger.info('get all customers');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting customers', err);
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM customer', function(error, results, fields) {
                connection.release();

                if (error) {
                    logger.error('Error getting customer', error);
                    callback(error, null);
                    return;
                }

                callback(null, {
                    status: 200,
                    message: `${results.length} customer retrieved`,
                    data: results,
                });
            });
        });
    }
};

module.exports = customerService;