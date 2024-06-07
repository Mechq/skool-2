const dashboardService = require("../service/dashboard.service");
const logger = require("../util/logger");

let dashboardController = {
    getCommissionsWorkshopsByTeacherId: (req, res, next) => {
        const teacherId = req.params.id;

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
    }

};

module.exports = dashboardController;