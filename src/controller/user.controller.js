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

    login: (req, res, next) => {
        const { email, password } = req.body;
        logger.info('Logging in user', { email });

        userService.login(email, password, (error, success) => {
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
                token: success.token
            });
        });
    }
};

module.exports = userController;
