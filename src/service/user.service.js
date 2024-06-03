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

                const sql = "INSERT INTO user (`email`, `password`) VALUES (?, ?)";
                const values = [user.name, user.email, hash];

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
                connection.release();
                if (err) {
                    logger.error('Error executing query', err);
                    callback(err, null);
                    return;
                }

                if (results.length === 0) {
                    callback(null, {
                        status: 'Error',
                        message: 'Wrong Email or Password'
                    });
                    return;
                }

                bcrypt.compare(password.toString(), results[0].password, (err, response) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }

                    if (response) {
                        const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
                        callback(null, {
                            status: 'Success',
                            message: 'Login successful',
                            token: token
                        });
                    } else {
                        callback(null, {
                            status: 'Error',
                            message: 'Wrong Email or Password'
                        });
                    }
                });
            });
        });
    }
};

module.exports = userService;
