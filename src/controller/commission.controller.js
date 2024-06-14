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
    },

    getCustomer: (req, res, next) => {
        const commissionId = req.params.commissionId;
        logger.info('retrieving customer name from commissionId', commissionId);

        commissionService.getCustomer(commissionId, (error, success) => {
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
    getStartAndEndTime: (req, res, next) => {
        const commissionId = req.params.commissionId;
        logger.info('retrieving start and end time from commissionId', commissionId);

        commissionService.getStartAndEndTime(commissionId, (error, success) => {
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

    deleteCommission: (req, res, next) => {
        const id = req.params.id;

        logger.info("deleting by id ", id);

        commissionService.deleteCommission(id, (error, success) => {
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
    getDurations: (req, res, next) => {

        commissionService.getDuration((error, success) => {
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
        })
    },
    updateCommissionDates: (req, res, next) => {
        const id = req.params.id;
        const dates = req.body;
        logger.info("updating commission dates by id ", id);

        commissionService.updateCommissionDates(id, dates, (error, success) => {
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