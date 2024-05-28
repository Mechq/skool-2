const database = require('../database/database.connection');
const logger = require('../util/logger');

const customerService = {
  create: (customer, callback) => {
    logger.info('creating customer', customer);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error('Error creating customer', err);
        callback(err, null);
        return;
      }

      const {
        name,
        category,
        description,
        picture,
        materials
      } = customer;

      const values = [name, category, description, picture, materials];

      // TODO: Implement the query to insert correct data
      const query = 'INSERT INTO workshop (name, category, description, picture, materials) VALUES (?, ?, ?, ?, ?)';

      logger.debug('query', query);

      connection.query(
        query,
        values,
        function(error, results, fields) {
            connection.release();

            if (error) {

                // TODO: Implement correct logging for possible error cases
                logger.error('Error creating customer', error);
                callback(error, null);
                return;
            }

            else {
                // Get the last inserted id for logging
                const customerId = results.insertId;
                logger.trace('customer created', customerId);

                const customerDataWithId = { ...customer, Id: customerId };
                callback(null, {
                    status: 200,
                    message: 'customer created',
                    data: customerDataWithId,
                });
            }
        }
      )
    });
  },


    getAll: (callback) => {
        logger.info('get all customers');

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting customers', err);
                callback(err, null);
                return;
            }


            connection.query(
                'SELECT id,name FROM workshop',
                function(error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error getting customer', error);
                        callback(error, null);
                        return;
                    }

                    else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} customer retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    }

};

module.exports = customerService;
