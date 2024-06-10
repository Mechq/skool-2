const logger = require("../util/logger");
const languageService = require("../service/language.service");
const { getAll } = require("../service/user.service");

let languageController = {
    getAllLanguages: (req, res) => {
        logger.info('retrieving languages');

        languageService.getAll((error, success) => {
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
}

module.exports = languageController;