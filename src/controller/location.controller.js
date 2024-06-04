const locationService = require("../service/location.service");
const logger = require("../util/logger");

let locationController = {
    createLocation: (req, res, next) => {
        const location = req.body;

        logger.info("creating location", location);

        locationService.create(location, (error, success) => {
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

    getAllLocations: (req, res, next) => {
        logger.info("retrieving locations");

        locationService.getAll((error, success) => {
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

    getLocationById: (req, res, next) => {
        const id = req.params.id;

        logger.info("getting by id ", id);

        locationService.getLocationById(id, (error, success) => {
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
        const location = req.body;
        const id = req.params.id;

        logger.info("updating location", location);

        locationService.update(location, id, (error, success) => {
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

    getDefaultLocationByCustomerId: (req, res, next) => {
        const customerId = req.params.customerId;

        logger.info("retrieving default location by customer id", customerId);

        locationService.getDefaultLocationByCustomerId(customerId, (error, success) => {
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

    getLocationsByCustomerId: (req, res, next) => {
        const customerId = req.params.customerId;

        logger.info("retrieving locations by customer id", customerId);

        locationService.getLocationsByCustomerId(customerId, (error, success) => {
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

module.exports = locationController;