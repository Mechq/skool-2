const locationService = require('../service/location.service');
const logger = require('../util/logger');

let locationController = {
  createLocation: (req, res, next) => {
    const location = req.body;

    logger.info('creating location', location);

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
    logger.info('retrieving locations');

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
  }

  
};

module.exports = locationController;
