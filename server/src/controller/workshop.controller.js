const workshopService = require('../service/workshop.service');
const logger = require('../util/logger');

let workshopController = {
  createWorkshop: (req, res, next) => {
    const workshop = req.body;

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
  }

  
};

module.exports = workshopController;
