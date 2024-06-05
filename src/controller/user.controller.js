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
    }
};

module.exports = userController;
