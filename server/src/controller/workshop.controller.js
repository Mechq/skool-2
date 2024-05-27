const workshopService = require('../service/workshop.service');
const logger = require('../util/logger');

let workshopController = {
  update: (req, res, next) => {
    const workshop = req.body;

    // Need to improve the logging here. No need to log the entire workshop object.
    logger.info('creating workshop', workshop);

    workshopService.update(workshop, (error, success) => {
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

    // Need to improve the logging here. No need to log the entire workshop object.
    logger.info('getting by id ', id);

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
          data: success.data,
        });
      }
    });
  },
  
};

module.exports = workshopController;
