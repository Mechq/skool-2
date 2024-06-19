const userService = require('../service/user.service');
const logger = require('../util/logger');

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
                // Do not set the cookie here, just return the token
                res.json({
                    status: 'Success',
                    message: 'Login successful',
                    token: result.token
                });
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

    getAllUsers: (req, res, next) => {  // Added 'next' here
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
    },

    getLanguages: (req, res, next) => {
        const id = req.params.id;

        logger.info('retrieving languages of user', id);

        userService.getLanguages(id, (error, success) => {
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
    accept: (req, res, next) => {
        const id = req.params.id;

        logger.info('accepting user', id);

        userService.accept(id, (error, success) => {
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
    delete: (req, res, next) => {
        const id = req.params.id;

        logger.info('deleting user', id);

        userService.delete(id, (error, success) => {
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
