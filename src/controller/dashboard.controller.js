const dashboardService = require("../service/dashboard.service");
const logger = require("../util/logger");

let dashboardController = {
    getCommissionsWorkshopsByTeacherId: (req, res, next) => {
        const teacherId = req.params.teacherId;

        logger.info("getting all workshops by teacher id", teacherId);

        dashboardService.getWorkshopsCommissionsById(teacherId, (error, success) => {
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

    deleteEnrollmentById: (req, res, next) => {
        const commissionWorkshopId = req.params.commissionWorkshopId;
        const userId = req.params.userId;

        logger.info("deleting commission by id", commissionWorkshopId, userId);

        dashboardService.deleteEnrollmentById(commissionWorkshopId, userId, (error, success) => {
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

};

module.exports = dashboardController;