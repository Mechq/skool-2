const roundService = require('../service/round.service');
const logger = require('../util/logger');

let roundController = {
    createRound: (req, res, next) => {
        const round = req.body;

        logger.info('creating round', round);

        roundService.create(round, (error, success) => {
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

    getAllRoundsFromCommission: (req, res, next) => {
        const id = req.params.id;
        logger.info('retrieving rounds from commission', id);

        roundService.getAllRoundsFromCommission(id, (error, success) => {
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

    deleteRound: (req, res, next) => {
        const id = req.params.id;
        logger.info('deleting round', id);

        roundService.deleteRound(id, (error, success) => {
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

module.exports = roundController;