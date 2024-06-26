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
                user.role = "teacher";

                // Set kvkNumber to null if it's empty
                const kvkNumber = user.kvkNumber ? user.kvkNumber : null;
                const btwNumber = user.btwNumber ? user.btwNumber : null;
                const hasCar = user.hasCar ? user.hasCar : null;
                const hasDriversLicense = user.hasDriversLicense ? user.hasDriversLicense : null;

                const sql = "INSERT INTO user (`email`, `password`, `firstName`, `lastName`, `phoneNumber`, `birthDate`, `street`, `houseNumber`, `postalCode`, `city`, `country`,`kvkNumber`, `btwNumber`, `iban`, `hasCar`, `hasDriversLicense`, `isZZPer`, `role`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                const values = [user.email, hash, user.firstName, user.lastName, user.phoneNumber, user.birthDate, user.streetName, user.houseNumber, user.postalCode, user.city, user.country, kvkNumber, btwNumber, user.iban, hasCar, hasDriversLicense, user.isZZPer, user.role];

                connection.query(sql, values, (err, result) => {
                    connection.release();
                    if (err) {
                        logger.error('Error executing query', err);
                        callback(err, null);
                        return;
                    }

                    callback(null, {
                        status: 'Success',
                        message: 'Profile registered successfully',
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
                if (user.isAccepted === 0) {
                    connection.release();
                    callback(null, {
                        status: 'Error',
                        message: 'Account is nog niet geaccepteerd'
                    });
                    return;
                }
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

            const query = `SELECT * FROM user WHERE role = 'teacher' ORDER BY firstName`;

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
        logger.info('Updating user', id);

        database.getConnection((err, connection) => {
            if (err) {
                logger.error('Error updating user', err);
                callback(err, null);
                return;
            }

            let sql = 'UPDATE user SET ';
            const values = [];

            if (user.firstName) {
                sql += 'firstName = ?, ';
                values.push(user.firstName);
            }
            if (user.lastName) {
                sql += 'lastName = ?, ';
                values.push(user.lastName);
            }
            if (user.email) {
                sql += 'email = ?, ';
                values.push(user.email);
            }
            if (user.phoneNumber) {
                sql += 'phoneNumber = ?, ';
                values.push(user.phoneNumber);
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
            if (user.country) {
                sql += 'country = ?, ';
                values.push(user.country);
            }
            if (user.hasDriversLicense !== undefined) {
                sql += 'hasDriversLicense = ?, ';
                values.push(user.hasDriversLicense);
            }
            if (user.hasCar !== undefined) {
                sql += 'hasCar = ?, ';
                values.push(user.hasCar);
            }
            if (user.isZZPer !== undefined) {
                sql += 'isZZPer = ?, ';
                values.push(user.isZZPer);
            }
            if (user.hourlyRate) {
                sql += 'hourlyRate = ?, ';
                values.push(user.hourlyRate);
            }
            if (user.iban) {
                sql += 'iban = ?, ';
                values.push(user.iban);
            }
            if (user.kvkNumber) {
                sql += 'kvk = ?, ';
                values.push(user.kvk);
            }
            if (user.btwNumber) {
                sql += 'btw = ?, ';
                values.push(user.btw);
            }
            // Add other fields you want to update

            // Remove trailing comma and space
            sql = sql.slice(0, -2);

            sql += ' WHERE id = ?';
            values.push(id);

            logger.debug('SQL:', sql);
            logger.debug('Values:', values);

            connection.query(sql, values, (error, results, fields) => {
                if (error) {
                    logger.error('Error updating user', error);
                    connection.release();
                    callback(error, null);
                } else {
                    logger.trace('User updated', results);

                    // Retrieve the updated user information
                    userService.getById(id, (err, updatedUser) => {
                        connection.release();
                        if (err) {
                            callback(err, null);
                        } else {
                            // Generate a new token with updated user information
                            const token = jwt.sign(updatedUser.data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

                            // Include the new token in the response
                            updatedUser.data.token = token;
            
                            callback(null, {
                                status: 200,
                                message: 'Profile updated',
                                data: updatedUser.data,
                            });
                        }
                    });
                }
            });
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
    },

    getLanguages: (id, callback) => {
        logger.info('retrieving languages of user', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error retrieving languages of user', err);
                callback(err, null);
                return;
            }

            const query = 'SELECT * FROM language WHERE id IN (SELECT languageId FROM userLanguageQualification WHERE userId = ?)';

            logger.debug('query', query);

            connection.query(
                query,
                [id],
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error retrieving languages of user', error);
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
            );
        });
    },
    accept: (id, callback) => {
        logger.info('accepting user', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error accepting user', err);
                callback(err, null);
                return;
            }

            const query = 'UPDATE user SET isAccepted = 1 WHERE id = ?';

            logger.debug('query', query);

            connection.query(
                query,
                [id],
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error accepting user', error);
                        callback(error, null);
                    } else {
                        logger.trace('user accepted', results);
                        callback(null, {
                            status: 200,
                            message: 'user accepted',
                            data: results,
                        });
                    }
                }
            );
        });
    },
    delete: (id, callback) => {
        logger.info('deleting user', id);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error deleting user', err);
                callback(err, null);
                return;
            }

            const query = 'DELETE FROM user WHERE id = ?';

            logger.debug('query', query);

            connection.query(
                query,
                [id],
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error deleting user', error);
                        callback(error, null);
                    } else {
                        logger.trace('user deleted', results);
                        callback(null, {
                            status: 200,
                            message: 'user deleted',
                            data: results,
                        });
                    }
                }
            );
        });
    }
};

module.exports = userService;
