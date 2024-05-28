const workshopService = require("../service/workshop.service");
const logger = require("../util/logger");

let workshopController = {
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
};

module.exports = workshopController;
