const roundService = require('../service/round.service');
const logger = require('../util/logger');

let roundController = {
    createRound: (req, res, next) => {
        const round = req.body;
        const commissionId = req.params.id;
        logger.info('creating round', round);

        roundService.create(commissionId, round, (error, success) => {
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
        console.log("aaaaaaaaaaaaaaaaaaaaa")
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
    }
};

module.exports = roundController;