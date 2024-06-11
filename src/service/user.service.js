const database = require('../database/database.connection');
const logger = require('../util/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
    register: (user, callback) => {
        logger.info('Creating user', user);

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error creating user', err);
                callback(err, null);
                return;
            }

            bcrypt.hash(user.password.toString(), 10, (err, hash) => {
                if (err) {
                    logger.error('Error hashing password', err);
                    callback(err, null);
                    return;
                }
                user.role = "teacher"

                const sql = "INSERT INTO user (`email`, `password`, `firstName`, `lastName`, `phoneNumber`, `birthDate`, `street`, `houseNumber`, `postalCode`, `city`, `country`,`kvkNumber`, `btwNumber`, `iban`, `role`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                const values = [user.email, hash, user.firstName, user.lastName, user.phoneNumber, user.birthDate, user.streetName, user.houseNumber, user.postalCode, user.city, user.country, user.kvkNumber, user.btwNumber, user.iban, user.role];

                connection.query(sql, values, (err, result) => {
                    connection.release();
                    if (err) {
                        logger.error('Error executing query', err);
                        callback(err, null);
                        return;
                    }

                    callback(null, {
                        status: 'Success',
                        message: 'User registered successfully',
                        data: result
                    });
                });
            });
        });
    },

    login: (email, password, callback) => {
        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error connecting to database', err);
                callback(err, null);
                return;
            }

            const sql = "SELECT * FROM user WHERE email = ?";

            connection.query(sql, [email], (err, results) => {
                if (err) {
                    connection.release();
                    logger.error('Error executing query', err);
                    callback(err, null);
                    return;
                }

                if (results.length === 0) {
                    connection.release();
                    callback(null, {
                        status: 'Error',
                        message: 'Verkeerde Email of Wachtwoord'
                    });
                    return;
                }

                const user = results[0];

                bcrypt.compare(password.toString(), user.password, (err, response) => {
                    if (err) {
                        connection.release();
                        callback(err, null);
                        return;
                    }

                    if (response) {
                        logger.debug('Login successful', {email: email});
                        // Include the entire user object in the token payload
                        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
                        connection.release();
                        callback(null, {
                            status: 'Success',
                            message: 'Login successful',
                            token: token
                        });
                    } else {
                        connection.release();
                        callback(null, {
                            status: 'Error',
                            message: 'Verkeerde Email of Wachtwoord'
                        });
                    }
                });
            });


        });
    },

    getAll: (callback) => {
        logger.info('Retrieving all users')

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error connecting to database', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT * FROM user ORDER BY firstName';

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
    },
    getById: (id, callback) => {
        logger.info('retrieving user', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error retrieving user', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT * FROM user WHERE id = ?';

            logger.debug('query', query);

            connection.query(
                query,
                [id],
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error retrieving user', error);
                        callback(error, null);
                    } else {
                        logger.trace('user retrieved', results);

                        callback(null, {
                            status: 200,
                            message: 'user retrieved',
                            data: results[0],
                        });
                    }
                }
            )
        });
    },

    getByEmail: (email, callback) => {
        logger.info('retrieving user by email', email);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error retrieving user by email', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT * FROM user WHERE email = ?';

            logger.debug('query', query);

            connection.query(
                query,
                [email],
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error retrieving user by email', error);
                        callback(error, null);
                    } else if (results.length === 0) {
                        logger.trace('No user found with the provided email');
                        callback(null, {
                            status: 404,
                            message: 'No user found',
                            data: null,
                        });
                    } else {
                        logger.trace('user retrieved', results);
                        callback(null, {
                            status: 200,
                            message: 'user retrieved',
                            data: results[0],
                        });
                    }
                }
            );
        });
    }
};

module.exports = userService;
