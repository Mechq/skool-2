const userService = require('../service/user.service');
const logger = require('../util/logger');
const cookieParser = require('cookie-parser');

const userController = {
    register: (req, res, next) => {
        const user = req.body;
        logger.info('Registering user', user);

        userService.register(user, (error, success) => {
            if (error) {
                return next({
                    status: 500,
                    message: error.message,
                    data: {}
                });
            }

            res.status(200).json({
                status: success.status,
                message: success.message,
                data: success.data
            });
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        userService.login(email, password, (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
            }

            if (result.status === 'Success') {
                res.cookie('token', result.token, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
                res.json({ status: 'Success', message: 'Login successful' });
            } else {
                res.status(401).json(result);
            }
        });
    },
    getById: (req, res, next) => {
        const id = req.params.id;

        logger.info('retrieving user', id);

        userService.getById(id, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {},
                });
            }

            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data,
                });
            }
        });
    },
    getAllUsers: (req, res, next) => {
        logger.info('retrieving users');

        userService.getAll((error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {},
                });
            }

            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data,
                });
            }
        });
    },

    updateUser: (req, res, next) => {
        const id = req.params.id;
        const user = req.body;

        logger.info('updating user', id);

        userService.update(id, user, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {},
                });
            }

            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data,
                });
            }
        });
    },

    getByEmail: (req, res, next) => {
        const email = req.params.email;

        logger.info('retrieving user by email', email);

        userService.getByEmail(email, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {},
                });
            }

            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data,
                });
            }
        });
    }
};

module.exports = userController;
