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
        const id = req.params.id;
        logger.info('retrieving customer', id);

        customerService.getById(id, (error, success) => {
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

    updateCustomer: (req, res, next) => {
        const id = req.params.id;
        const customer = req.body;
        logger.info('updating customer', id);

        customerService.update(id, customer, (error, success) => {
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