const customerService = require("../../src/service/customer.service");
const logger = require("../util/logger");

let customerController = {
    createCustomer: (req, res, next) => {
        const customer = req.body;
        logger.debug('customer', customer);

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
    },
    getCustomerById: (req, res, next) => {
        const customerId = req.params.id;
        logger.debug('customerId', customerId);

        logger.info('retrieving customer by id', customerId);

        customerService.getCustomerById(customerId, (error, success) => {
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