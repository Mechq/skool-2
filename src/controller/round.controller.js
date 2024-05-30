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

    getAllroundsFromCommission: (req, res, next) => {
        const commissionId = req.params.commissionId;
        logger.info('retrieving rounds from commission', commissionId);

        roundService.getAllroundsFromCommission(commissionId, (error, success) => {
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