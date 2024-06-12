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
    },

    getInvites: (req, res, next) => {
        const userId = req.params.userid;
        logger.info("fetching invites for user", userId);

        inviteService.getInvites(userId, (error, success) => {
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

    updateInvite: (req, res, next) => {
        const inviteId = req.params.inviteId;
        const status = req.body.status;
        logger.info("updating invite", inviteId, status);

        inviteService.updateInvite(inviteId, status, (error, success) => {
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