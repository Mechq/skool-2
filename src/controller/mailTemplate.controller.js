const mailTemplateService = require('../service/mailTemplate.service');
const logger = require('../util/logger');

let mailTemplateController = {
    createMailTemplate: (req, res, next) => {
        const mailTemplate = req.body;

        // Need to improve the logging here. No need to log the entire mailTemplate object.
        logger.info('creating mail template', mailTemplate);

        mailTemplateService.create(mailTemplate, (error, success) => {
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

    getAllMailTemplates: (req, res, next) => {
        // Need to improve the logging here. No need to log the entire workshop object.
        logger.info('retrieving mail templates');

        mailTemplateService.getAll((error, success) => {
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

module.exports = mailTemplateController;