const database = require('../database/database.connection');
const logger = require('../util/logger');

const mailTemplateService = {
  create: (mailTemplate, callback) => {
    logger.info('creating mail template', mailTemplate);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error('Error creating mail template', err);
        callback(err, null);
        return;
      }

      const {
        name,
        category,
        description,
        picture,
        materials
      } = mailTemplate;

      const values = [name, category, description, picture, materials];

      // TODO: Implement the query to insert correct data
      const query = 'INSERT INTO Workshop (name, category, description, picture, materials) VALUES (?, ?, ?, ?, ?)';

      logger.debug('query', query);

      connection.query(
        query,
        values,
        function(error, results, fields) {
            connection.release();

            if (error) {

                // TODO: Implement correct logging for possible error cases
                logger.error('Error creating workshop', error);
                callback(error, null);
                return;
            }

            else {
                // Get the last inserted id for logging
                const workshopId = results.insertId;
                logger.trace('workshop created', workshopId);

                const workshopDataWithId = { ...workshop, Id: workshopId };
                callback(null, {
                    status: 200,
                    message: 'workshop created',
                    data: workshopDataWithId,
                });
            }
        }
      )
    });
  },

  
};

module.exports = workshopService;
