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
        contactName,
        email,
        phone,
        locationName,
        street,
        houseNumber,
        city,
        postalCode
      } = customer;

      const valuesLocation = [locationName, street, houseNumber, city, postalCode];

      const addressQuery = 'INSERT INTO location (name, street, houseNumber, city, postalCode) VALUES (?, ?, ?, ?, ?)';

      logger.debug('AddressQuery', addressQuery);

      connection.query(addressQuery, valuesLocation, function(error, results, fields) {
        if (error) {
          connection.release();
          logger.error('Error creating location', error);
          callback(error, null);
          return;
        }

        const locationId = results.insertId;  // get the inserted location ID
        const customerValues = [name, contactName, email, phone, locationId];
        const customerQuery = 'INSERT INTO customer (name, contactName, email, phone, locationId) VALUES (?, ?, ?, ?, ?)';

        connection.query(customerQuery, customerValues, function(error, results, fields) {
          connection.release();

          if (error) {
            logger.error('Error creating customer', error);
            callback(error, null);
            return;
          }

          const customerId = results.insertId;
          logger.trace('customer created', customerId);

          const customerDataWithId = { ...customer, id: customerId };
          callback(null, {
            status: 200,
            message: 'customer created',
            data: customerDataWithId,
          });
        });
      });
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

      connection.query('SELECT id, name FROM customer', function(error, results, fields) {
        connection.release();

        if (error) {
          logger.error('Error getting customer', error);
          callback(error, null);
          return;
        }

        callback(null, {
          status: 200,
          message: `${results.length} customer retrieved`,
          data: results,
        });
      });
    });
  }
};

module.exports = customerService;
