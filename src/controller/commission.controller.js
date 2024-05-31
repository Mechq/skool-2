const commissionService = require('../service/commission.service');
const logger = require('../util/logger');

let commissionController = {
    createCommission: (req, res, next) => {
        const commission = req.body;

        // Need to improve the logging here. No need to log the entire mailTemplate object.
        logger.info('creating commission', commission);

        commissionService.create(commission, (error, success) => {
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
    },

    getCommissionById: (req, res, next) => {
        const id = req.params.id;
        logger.debug('commissionId', id);

        logger.info('retrieving commission by id', id);

        commissionService.getCommissionById(id, (error, success) => {
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
        const commission = req.body;
        const id = req.params.id;
        logger.info('updating commission', commission);

        commissionService.update(commission, id, (error, success) => {
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