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

      const {
        name,
        category,
        description,
        picture,
        materials
      } = workshop;

      const values = [name, category, description, picture, materials];

      const query = 'INSERT INTO workshop (name, category, description, picture, materials) VALUES (?, ?, ?, ?, ?)';

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


    getAll: (callback) => {
        logger.info('get all workshops');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting workshops', err);
                callback(err, null);
                return;
            }


            connection.query(
                'SELECT id,name FROM workshop',
                function(error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error getting workshops', error);
                        callback(error, null);
                        return;
                    }

                    else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} workshops retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    }

};

module.exports = workshopService;
