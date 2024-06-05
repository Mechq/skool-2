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
    },
    getById: (req, res, next) => {
        // Need to improve the logging here. No need to log the entire workshop object.
        const id = req.params.id;
        logger.info('retrieving mail template', id);

        mailTemplateService.getById(id, (error, success) => {
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

    update: (req, res, next) => {
        const mailTemplate = req.body;
        const mailTemplateId = req.params.id;

        mailTemplate.id = mailTemplateId;

        logger.info("updating mail template", mailTemplateId, mailTemplate);

        mailTemplateService.update(mailTemplate, mailTemplateId, (error, success) => {
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

        logger.info('deleting mail template', id);

        mailTemplateService.delete(id, (error, success) => {
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