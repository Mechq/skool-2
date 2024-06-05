const teacherWorkshopQualificationService = require('../service/teacherWorkshopQualification.service');
const logger = require('../util/logger');

let teacherWorkshopQualification = {

    getAllByCustomerId: (req, res, next) => {
        const id = req.params.id;
        logger.info('retrieving teacherWorkshopQualification');

        teacherWorkshopQualificationService.getAllByCustomerId(id, (error, success) => {
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

module.exports = teacherWorkshopQualification;
