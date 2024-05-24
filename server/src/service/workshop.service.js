const database = require('../database/database.connection');
const logger = require('../util/logger');

const workshopService = {
  create: (workshop, callback) => {
    logger.info('creating workshop', workshop);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error('Error creating workshop', err);
        callback(err, null);
        return;
      }

    });
  },

  
};

module.exports = workshopService;
