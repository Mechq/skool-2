const logger = require('../util/logger');
const inviteService = require('../service/invite.service');

let inviteController = {
    invite: (req, res, next) => {
        const workshopId = req.params.workshopId;
        const userId = req.params.userId;
        logger.info("inviting user to workshop", userId, workshopId);

        inviteService.invite(workshopId, userId, (error, success) => {
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

module.exports = inviteController;