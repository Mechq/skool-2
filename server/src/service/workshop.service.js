const database = require('../database/database.connection');
const logger = require('../util/logger');

const workshopService = {
//   create: (workshop, callback) => {
//     logger.info('creating workshop', workshop);

//     database.getConnection(function (err, connection) {
//       if (err) {
//         logger.error('Error creating workshop', err);
//         callback(err, null);
//         return;
//       }

//     });
//   },

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
                    return;
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

    getWorkshopById: (id, callback) => {
    logger.info('getting workshop by id', id);

    let sql = 'SELECT * FROM workshop WHERE id = ?';

    database.query(sql, [id], (error, results, fields) => {
        if (error) {
            logger.error('Error getting workshop', error);
            callback(error, null);
            return;
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
                'SELECT * FROM workshop',
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
