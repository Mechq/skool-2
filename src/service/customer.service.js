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
    },

    getById: (id, callback) => {
        logger.info('getting customer by id', id);

        let sql = `SELECT customer.*, location.* 
           FROM customer 
           LEFT JOIN location ON customer.locationId = location.id 
           WHERE customer.id = ?`;
           
        database.query(sql, [id], (error, results, fields) => {
            if (error) {
                logger.error('Error getting customer', error);
                callback(error, null);
                return;
            }

            if (results.length === 0) {
                logger.warn('customer not found', id);
                callback({
                    status: 404,
                    message: 'customer not found',
                }, null);
                return;
            }

            callback(null, {
                status: 200,
                message: 'customer retrieved',
                data: results[0],
            });
        });
    }

};

module.exports = customerService;