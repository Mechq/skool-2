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
    update:
        (customer, customerId, callback) => {
            logger.info('updating customer', customer);

            let sql = 'UPDATE customer SET ';
            const values = [];

            if (customer.name) {
                sql += 'name = ?, ';
                values.push(customer.name);
            }
            if (customer.locationId) {
                sql += 'locationName = ?, ';
                values.push(customer.locationId);
            }
            if (customer.contactName) {
                sql += 'contactName = ?, ';
                values.push(customer.contactName);
            }
            if (customer.phone) {
                sql += 'phone = ?, ';
                values.push(customer.phone);
            }
            if (customer.email) {
                sql += 'email = ?, ';
                values.push(customer.email);
            }


            // Remove the trailing comma and space
            sql = sql.slice(0, -2);

            sql += ' WHERE id = ?';
            values.push(customer.id);

            database.query(sql, values, (error, results, fields) => {
                if (error) {
                    logger.error('Error updating customer', error);
                    callback(error, null);

                } else {
                    if (results.affectedRows > 0) {
                        logger.info('customer updated successfully');
                        callback(null, 'customer updated successfully');
                    } else {
                        logger.info('No customer found with the provided ID');
                        callback(null, 'No customer found with the provided ID');
                    }
                }
            });
        },
    getCustomerById: (id, callback) => {
        logger.info('getting customer by id', id);

        let sql = 'SELECT * FROM customer WHERE id = ?';

        database.query(sql, [id], (error, results, fields) => {
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
                    logger.warn('No customer found with id', id);
                    callback({
                        status: 404,
                        message: 'Customer not found',
                    }, null);
                }
            }
        });
    },
};

module.exports = customerService;