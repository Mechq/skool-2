const commissionService = require('../service/commission.service');
const logger = require('../util/logger');

let commissionController = {
    // createMailTemplate: (req, res, next) => {
    //     const mailTemplate = req.body;
    //
    //     // Need to improve the logging here. No need to log the entire mailTemplate object.
    //     logger.info('creating mail template', mailTemplate);
    //
    //     mailTemplateService.create(mailTemplate, (error, success) => {
    //         if (error) {
    //             return next({
    //                 status: error.status,
    //                 message: error.message,
    //                 data: {},
    //             });
    //         }
    //
    //         if (success) {
    //             res.status(200).json({
    //                 status: success.status,
    //                 message: success.message,
    //                 data: success.data,
    //             });
    //         }
    //     });
    // },

    getAllCommissions: (req, res, next) => {
        // Need to improve the logging here. No need to log the entire workshop object.
        logger.info('retrieving commissions');

        commissionService.getAll((error, success) => {
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

module.exports = commissionController;