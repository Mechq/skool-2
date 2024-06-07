const workshopService = require("../service/workshop.service");
const logger = require("../util/logger");

let workshopController = {
    createWorkshop: (req, res, next) => {
        const workshop = req.body;

        // Need to improve the logging here. No need to log the entire workshop object.
        logger.info('creating workshop', workshop);

        workshopService.create(workshop, (error, success) => {
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

    getAllWorkshops: (req, res, next) => {
        // Need to improve the logging here. No need to log the entire workshop object.
        logger.info('retrieving workshops');

        workshopService.getAll((error, success) => {
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
    update: (req, res, next) => {
        const workshop = req.body;
        const workshopId = req.params.id;

        workshop.id = workshopId;

        logger.info("updating workshop", workshopId, workshop);

        workshopService.update(workshop, workshopId, (error, success) => {
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

    getWorkshopById: (req, res, next) => {
        const id = req.params.id;

        logger.info("getting by id ", id);

        workshopService.getWorkshopById(id, (error, success) => {
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
                    data: success.data, // Forward the workshop data
                });
            }
        });
    },

    deleteWorkshop: (req, res, next) => {
        const id = req.params.id;

        logger.info("deleting by id ", id);

        workshopService.deleteWorkshop(id, (error, success) => {
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

    getWorkshopCommission: (req, res, next) => {
        logger.info("getting all workshops and commissions");

        workshopService.getWorkshopCommission((error, success) => {
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

module.exports = workshopController;
