const logger = require("../util/logger");
const enrollmentService = require("../service/enrollment.service");

let enrollmentController = {
    getAllEnrollments: (req, res, next) => {
        logger.info("getting all enrollments");

        enrollmentService.getAllEnrollments((error, success) => {
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

    updateEnrollment: (req, res, next) => {
        const id = req.params.id;
        logger.info("updating enrollment", id);

        enrollmentService.updateEnrollment(id, req.body, (error, success) => {
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

module.exports = enrollmentController;