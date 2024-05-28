const database = require('../database/database.connection');
const logger = require('../util/logger');

const locationService = {
  create: (location, callback) => {
    logger.info('creating location', location);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error('Error creating location', err);
        callback(err, null);
        return;
      }

      const {
        name,
        street,
        housenumber,
        city,
        postalcode
      } = location;

      const values = [name, street, housenumber, city, postalcode];

      const query = 'INSERT INTO location (name, street, housenumber, city, postalcode) VALUES (?, ?, ?, ?, ?)';

      logger.debug('query', query);

      connection.query(
        query,
        values,
        function(error, results, fields) {
            connection.release();

            if (error) {

                logger.error('Error creating location', error);
                callback(error, null);
                return;
            }

            else {
                // Get the last inserted id for logging
                const locationId = results.insertId;
                logger.trace('location created', locationId);

                const locationDataWithId = { ...location, Id: locationId };
                callback(null, {
                    status: 200,
                    message: 'location created',
                    data: locationDataWithId,
                });
            }
        }
      )
    });
  },


    // getAll: (callback) => {
    //     logger.info('get all workshops');

    //     database.getConnection(function (err, connection) {
    //         if (err) {
    //             logger.error('Error getting workshops', err);
    //             callback(err, null);
    //             return;
    //         }


    //         connection.query(
    //             'SELECT id,name FROM workshop',
    //             function(error, results, fields) {
    //                 connection.release();

    //                 if (error) {

    //                     // TODO: Implement correct logging for possible error cases
    //                     logger.error('Error getting workshops', error);
    //                     callback(error, null);
    //                     return;
    //                 }

    //                 else {
    //                     callback(null, {
    //                         status: 200,
    //                         message: `${results.length} workshops retrieved`,
    //                         data: results,
    //                     });
    //                 }
    //             }
    //         )
    //     });
    // }

};

module.exports = locationService;
