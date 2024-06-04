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
    }
};

module.exports = userController;
