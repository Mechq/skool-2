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
    },

    update: (id, user, callback) => {
        logger.info('updating user', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error updating user', err);
                callback(err, null);
                return;
            }

            let sql = 'UPDATE user SET ';
            const values = [];

            if (user.email) {
                sql += 'e = ?, ';
                values.push(user.email);
            }
            if (user.password) {
                sql += 'password = ?, ';
                values.push(user.password);
            }
            if (user.street) {
                sql += 'street = ?, ';
                values.push(user.street);
            }
            if (user.houseNumber) {
                sql += 'houseNumber = ?, ';
                values.push(user.houseNumber);
            }
            if (user.postalCode) {
                sql += 'postalCode = ?, ';
                values.push(user.postalCode);
            }
            if (user.city) {
                sql += 'city = ?, ';
                values.push(user.city);
            }
            if (user.birthDate) {
                sql += 'birthDate = ?, ';
                values.push(user.birthDate);
            }
            if (user.btwNumber) {
                sql += 'btwNumber = ?, ';
                values.push(user.btwNumber);
            }
            if (user.kvkNumber) {
                sql += 'kvkNumber = ?, ';
                values.push(user.kvkNumber);
            }
            if (user.IBAN) {
                sql += 'IBAN = ?, ';
                values.push(user.IBAN);
            }
            if (user.role) {
                sql += 'role = ?, ';
                values.push(user.role);
            }
            if (user.firstName) {
                sql += 'firstName = ?, ';
                values.push(user.firstName);
            }
            if (user.lastName) {
                sql += 'lastName = ?, ';
                values.push(user.lastName);
            }

            sql = sql.slice(0, -2);

            sql += ' WHERE id = ?';

            values.push(id);
            logger.debug('query', query);
            logger.debug('values', values);


            connection.query(
                query,
                values,
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error updating user', error);
                        callback(error, null);
                    } else {
                        logger.trace('user updated', results);

                        callback(null, {
                            status: 200,
                            message: 'user updated',
                            data: results,
                        });
                    }
                }
            )
        });
    }
};

module.exports = userService;
