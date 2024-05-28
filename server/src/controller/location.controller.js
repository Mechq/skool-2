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

//   getAllWorkshops: (req, res, next) => {
//     // Need to improve the logging here. No need to log the entire workshop object.
//     logger.info('retrieving workshops');

//     workshopService.getAll((error, success) => {
//       if (error) {
//         return next({
//           status: error.status,
//           message: error.message,
//           data: {},
//         });
//       }

//       if (success) {
//         res.status(200).json({
//           status: success.status,
//           message: success.message,
//           data: success.data,
//         });
//       }
//     });
//   }

  
};

module.exports = locationController;
