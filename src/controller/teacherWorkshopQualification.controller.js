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

    create: (req, res, next) => {
        const userId = req.params.id;
        const workshopIds = req.body.workshops;
        logger.info('creating teacherWorkshopQualification');

        teacherWorkshopQualificationService.setWorkshops(workshopIds, userId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {},
                });
            }

            if (success) {
                res.status(201).json({
                    status: success.status,
                    message: success.message,
                    data: success.data,
                });
            }
        });

    },
    delete: (req, res, next) => {
        const userId = req.params.userId;
        const workshopIds = req.body.workshops;
        logger.info('deleting teacherWorkshopQualification');

        teacherWorkshopQualificationService.delete(userId,workshopIds, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {},
                });
            }

            if (success) {
                res.status(201).json({
                    status: success.status,
                    message: success.message,
                    data: success.data,
                });
            }
        });

    },

    getAllByWorkshopId: (req, res, next) => {
        const id = req.params.workshopId;
        logger.info('retrieving teacherWorkshopQualification');

        teacherWorkshopQualificationService.getAllByWorkshopId(id, (error, success) => {
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

module.exports = teacherWorkshopQualification;
