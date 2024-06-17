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

                email,
                phone,
                locationId,
            } = customer;

            const values = [name, email, phone, locationId];

            const sql = 'INSERT INTO customer (name, email, phone, locationId) VALUES (?, ?, ?, ?)';
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

        let sql = `SELECT customer.*, location.street, location.houseNumber, location.city, location.postalCode, location.name AS locationName, location.id AS locationId, customer.id AS customerId
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
    },

    update: (id, customer, callback) => {
        logger.info('updating customer', id);
    
        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error updating customer', err);
                callback(err, null);
                return;
            }
    
            const {
                locationId
            } = customer
            logger.debug('locationId: ', locationId)
    
            const customerValues = [];
            const locationValues = [];
    
            let customerSql = 'UPDATE customer SET ';
            let locationSql = 'UPDATE location SET ';
    
            if (customer.name) {
                customerSql += 'name = ?, ';
                customerValues.push(customer.name);
            }
            if (customer.email) {
                customerSql += 'email = ?, ';
                customerValues.push(customer.email);
            }
            if (customer.phone) {
                customerSql += 'phone = ?, ';
                customerValues.push(customer.phone);
            }
            if (customer.locationName) {
                locationSql += 'name = ?, ';
                locationValues.push(customer.locationName);
            }
            if (customer.street) {
                locationSql += 'street = ?, ';
                locationValues.push(customer.street);
            }
            if (customer.houseNumber) {
                locationSql += 'houseNumber = ?, ';
                locationValues.push(customer.houseNumber);
            }
            if (customer.city) {
                locationSql += 'city = ?, ';
                locationValues.push(customer.city);
            }
            if (customer.postalCode) {
                locationSql += 'postalCode = ?, ';
                locationValues.push(customer.postalCode);
            }
    
            locationSql = locationSql.slice(0, -2);
            customerSql = customerSql.slice(0, -2);
    
            locationSql += ' WHERE id = ?';
            customerSql += ' WHERE id = ?';
    
            locationValues.push(locationId);
            customerValues.push(id);
    
            connection.query(locationSql, locationValues, function(error, results, fields) {
                if (error) {
                    logger.error('Error updating location', error);
                    callback(error, null);
                    connection.release();
                    return;
                }
    
                connection.query(customerSql, customerValues, function(error, results, fields) {
                    connection.release();
    
                    if (error) {
                        logger.error('Error updating customer', error);
                        callback(error, null);
                        return;
                    }
    
                    logger.trace('customer updated', id);
                    callback(null, {
                        status: 200,
                        message: 'customer updated',
                        data: customer,
                    });
                });
            });
        });
    },
    updateContactPersons: (customerId, contactPersons, callback) => {
        logger.info('updating contact persons for customer', customerId);

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

                const deleteSql = 'DELETE FROM contactPerson WHERE customerId = ?';
                connection.query(deleteSql, [customerId], (error, results) => {
                    if (error) {
                        logger.error('Error deleting contact persons', error);
                        return connection.rollback(() => {
                            connection.release();
                            callback(error, null);
                        });
                    }

                    if (contactPersons.length === 0) {
                        connection.commit(err => {
                            if (err) {
                                logger.error('Error committing transaction', err);
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(err, null);
                                });
                            }
                            connection.release();
                            callback(null, {
                                status: 200,
                                message: 'Contact persons updated successfully',
                                data: []
                            });
                        });
                        return;
                    }

                    const insertSql = 'INSERT INTO contactPerson (name, email, phoneNumber, customerId) VALUES ?';
                    const values = contactPersons.map(({ name, email, phoneNumber }) => [name, email, phoneNumber, customerId]);

                    connection.query(insertSql, [values], (error, results) => {
                        if (error) {
                            logger.error('Error inserting contact persons', error);
                            return connection.rollback(() => {
                                connection.release();
                                callback(error, null);
                            });
                        }

                        connection.commit(err => {
                            if (err) {
                                logger.error('Error committing transaction', err);
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(err, null);
                                });
                            }

                            const insertedContactPersons = contactPersons.map((contactPerson, index) => ({
                                ...contactPerson,
                                id: results.insertId + index
                            }));

                            logger.trace('Contact persons updated', insertedContactPersons);
                            connection.release();
                            callback(null, {
                                status: 200,
                                message: 'Contact persons updated successfully',
                                data: insertedContactPersons
                            });
                        });
                    });
                });
            });
        });
    },
    getAllContactPersonsByCustomerId: (id, callback) => {
        logger.info('get all contact persons');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting contact persons', err);
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM `contactPerson` WHERE customerId = ?;', [id], function(error, results, fields) {
                connection.release();

                if (error) {
                    logger.error('Error getting contact person', error);
                    callback(error, null);
                    return;
                }

                callback(null, {
                    status: 200,
                    message: `${results.length} contact person retrieved`,
                    data: results,
                });
            });
        });
    },

};

module.exports = customerService;