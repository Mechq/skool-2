const categoryService = require('../service/category.service');
const logger = require('../util/logger');

let categoryController = {

    getAllCategories: (req, res, next) => {

        logger.info('retrieving categories');

        categoryService.getAll((error, success) => {
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
    getCategoryById: (req, res, next) => {
        const id = req.params.id;
        logger.info('retrieving category by id', id);

        categoryService.getCategoryById(id,(error, success) => {
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

module.exports = categoryController;
