const customerService = require("../service/customer.service");
const logger = require("../util/logger");

let customerController = {
  createCustomer: (req, res, next) => {
    const customer = req.body;

    // Need to improve the logging here. No need to log the entire workshop object.
    logger.info('creating customer', customer);

    customerService.create(customer, (error, success) => {
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

  getAllCustomers: (req, res, next) => {
    // Need to improve the logging here. No need to log the entire workshop object.
    logger.info('retrieving customers');

    customerService.getAll((error, success) => {
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

module.exports = customerController;
