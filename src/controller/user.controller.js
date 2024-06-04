const userService = require("../service/user.service");
const logger = require("../util/logger");

let userController = {
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
    }
};

module.exports = userController;
