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
                    logger.info('WorkshopTemplates fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'WorkshopTemplates fetched successfully',
                        data: results[0],
                    });
                } else {
                    logger.warn('No workshop found with id', id);
                    callback({
                        status: 404,
                        message: 'WorkshopTemplates not found',
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
                        logger.info('WorkshopTemplates updated successfully');
                        callback(null, 'WorkshopTemplates updated successfully');
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
                        logger.info('WorkshopTemplates deleted successfully');
                        callback(null, 'WorkshopTemplates deleted successfully');
                    } else {
                        logger.info('No workshop found with the provided ID');
                        callback(null, 'No workshop found with the provided ID');
                    }
                }
            });
        },

        getWorkshopCommission: (callback) => {
            logger.info('getting workshop commission');

            let sql = `
                SELECT  w.id AS workshopId,
                          c.id AS commissionId,
                          w.*,
                          c.*
                FROM workshop w
                         JOIN commissionWorkshop cw ON w.id = cw.workshopId
                         JOIN commission c ON cw.commissionId = c.id;

            `;
            database.query(sql, (error, results, fields) => {
                if (error) {
                    logger.error('Error getting workshop commission', error);
                    callback(error, null);

                } else {
                    if (results.length > 0) {
                        logger.info('WorkshopTemplates commission fetched successfully', results);
                        callback(null, {
                            status: 200,
                            message: 'WorkshopTemplates commission fetched successfully',
                            data: results,
                        });
                    } else {
                        logger.warn('No workshop commission found');
                        callback({
                            status: 404,
                            message: 'WorkshopTemplates commission not found',
                        }, null);
                    }
                }
            });
        },
    getWorkshopCommissionById: (workshopId, commissionId, callback) => {
        logger.info('getting workshop commission');

        let sql = `
               SELECT * FROM commissionWorkshop WHERE workshopId = ? AND commissionId = ?;

            `;
        database.query(sql, [workshopId, commissionId] ,(error, results, fields) => {
            if (error) {
                logger.error('Error getting workshop commission', error);
                callback(error, null);

            } else {
                if (results.length > 0) {
                    logger.info('WorkshopTemplates commission fetched successfully', results);
                    callback(null, {
                        status: 200,
                        message: 'WorkshopTemplates commission fetched successfully',
                        data: results[0],
                    });
                } else {
                    logger.warn('No workshop commission found');
                    callback({
                        status: 404,
                        message: 'WorkshopTemplates commission not found',
                    }, null);
                }
            }
        });
    },
 createEnrollment: (workshopId, commissionId, userId, callback) => {
     logger.info('creating enrollment');
    let commissionWorkshopId = null;
     let sql = `
               INSERT INTO enrollment (userId, commissionWorkshopId) VALUES (?, ?);

            `;
     database.query(`SELECT id FROM commissionWorkshop WHERE commissionId = ? AND workshopId = ?`, [commissionId, workshopId] ,(error, results, fields) => {
         if (error) {
             logger.error('Error creating enrollment', error);
             callback(error, null);

         }
         else {
                commissionWorkshopId = results[0].id;
                logger.debug(commissionWorkshopId)
             logger.debug(userId.userId)
                database.query(sql, [userId.userId, commissionWorkshopId] ,(error, results, fields) => {
                    if (error) {
                        logger.error('Error creating enrollment', error);
                        callback(error, null);

                    } else {
                        logger.info('Enrollment created successfully');
                        callback(null, {
                            status: 200,
                            message: 'Enrollment created successfully',
                            data: results,
                        });
                    }
                }
);
             }
     });
 },
    getEnrollments: (commissionId, workshopId, callback) => {
        logger.info('getting enrollments');

        let sql = `
               SELECT * FROM enrollment WHERE commissionWorkshopId = (SELECT id FROM commissionWorkshop WHERE commissionId = ? AND workshopId = ?);

            `;
        database.query(sql, [commissionId, workshopId] ,(error, results, fields) => {
            if (error) {
                logger.error('Error getting enrollments', error);
                callback(error, null);

            }
            else {
                logger.info('Enrollments fetched successfully', results);
                callback(null, {
                    status: 200,
                    message: 'Enrollments fetched successfully',
                    data: results,
                });
            }
        });
    },

    getAllCommissionWorkshops: (callback) => {
        logger.info('getting all commission workshops');

        const sql = `SELECT cd.date, c.customerId, cust.name AS customerName, w.name AS workshopName, CASE WHEN e.status = 'geaccepteerd' THEN CONCAT(u.firstName, ' ', u.lastName) ELSE '' END AS teacherName, w.id AS workshopId, cw.id AS commissionWorkshopId FROM commission AS c JOIN commissionWorkshop AS cw ON c.id = cw.commissionId JOIN customer AS cust ON c.customerId = cust.id JOIN workshop AS w ON cw.workshopId = w.id LEFT JOIN enrollment AS e ON cw.id = e.commissionWorkshopId AND e.status = 'geaccepteerd' LEFT JOIN user AS u ON e.userId = u.id LEFT JOIN commissionDate AS cd ON c.id = cd.commissionId;
`;
    
        database.query(sql, (error, results, fields) => {
            if (error) {
                logger.error('Error getting commission workshops', error);
                callback(error, null);
            } else {
                logger.info('Commissions workshops fetched successfully', results);
                callback(null, {
                    status: 200,
                    message: 'Commissions workshops fetched successfully',
                    data: results,
                });
            }
        });
    }
};

module.exports = workshopService;
