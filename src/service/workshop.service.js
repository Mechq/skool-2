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

            // TODO: Implement the query to insert correct data
            const query = 'INSERT INTO workshop (name, category, description, picture, materials) VALUES (?, ?, ?, ?, ?)';

            logger.debug('query', query);

            connection.query(
                query,
                values,
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error creating workshop', error);
                        callback(error, null);

                    } else {
                        // Get the last inserted id for logging
                        const workshopId = results.insertId;
                        logger.trace('workshop created', workshopId);

                        const workshopDataWithId = {...workshop, Id: workshopId};
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

    getWorkshopById: (id, callback) => {
        logger.info('getting workshop by id', id);

        let sql = 'SELECT * FROM workshop WHERE id = ?';

        database.query(sql, [id], (error, results, fields) => {
            if (error) {
                logger.error('Error getting workshop', error);
                callback(error, null);

            } else {
                if (results.length > 0) {
                    logger.info('Workshop fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'Workshop fetched successfully',
                        data: results[0],
                    });
                } else {
                    logger.warn('No workshop found with id', id);
                    callback({
                        status: 404,
                        message: 'Workshop not found',
                    }, null);
                }
            }
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
                'SELECT * FROM workshop ORDER BY name',
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error getting workshops', error);
                        callback(error, null);

                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} workshops retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    },
    update:
        (workshop, workshopId, callback) => {
            logger.info('updating workshop', workshop);

            let sql = 'UPDATE workshop SET ';
            const values = [];

            if (workshop.name) {
                sql += 'name = ?, ';
                values.push(workshop.name);
            }
            if (workshop.description) {
                sql += 'description = ?, ';
                values.push(workshop.description);
            }
            if (workshop.category !== undefined && workshop.category !== null) {
                sql += 'category = ?, ';
                values.push(workshop.category);
            }
            if (workshop.picture) {
                sql += 'picture = ?, ';
                values.push(workshop.picture);
            }
            if (workshop.materials) {
                sql += 'materials = ?, ';
                values.push(workshop.materials);
            }

            // Remove the trailing comma and space
            sql = sql.slice(0, -2);

            sql += ' WHERE id = ?';
            values.push(workshop.id);

            database.query(sql, values, (error, results, fields) => {
                if (error) {
                    logger.error('Error updating workshop', error);
                    callback(error, null);

                } else {
                    if (results.affectedRows > 0) {
                        logger.info('Workshop updated successfully');
                        callback(null, 'Workshop updated successfully');
                    } else {
                        logger.info('No workshop found with the provided ID');
                        callback(null, 'No workshop found with the provided ID');
                    }
                }
            });

        },

        deleteWorkshop: (id, callback) => {
            logger.info('deleting workshop', id);

            let sql = 'DELETE FROM workshop WHERE id = ?';

            database.query(sql, [id], (error, results, fields) => {
                if (error) {
                    logger.error('Error deleting workshop', error);
                    callback(error, null);

                } else {
                    if (results.affectedRows > 0) {
                        logger.info('Workshop deleted successfully');
                        callback(null, 'Workshop deleted successfully');
                    } else {
                        logger.info('No workshop found with the provided ID');
                        callback(null, 'No workshop found with the provided ID');
                    }
                }
            });
        }
};

module.exports = workshopService;
