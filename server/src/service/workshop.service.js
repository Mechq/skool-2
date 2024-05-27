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
        (workshop, callback) => {
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

        }



};

module.exports = workshopService;
