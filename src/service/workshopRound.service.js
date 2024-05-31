const database = require('../database/database.connection');
const logger = require('../util/logger');

const workshopRound = {
    create: (roundId, workshopId, workshopRound, callback) => {
        logger.info('creating workshop for round', workshopRound);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error creating workshop for round', err);
                callback(err, null);
                return;
            }

            const {
                amountOfTeachers,
                amountOfStudents,
            } = workshopRound;

            const values = [workshopId, roundId, amountOfStudents, amountOfTeachers];

            // TODO: Implement the query to insert correct data
            const query = 'INSERT INTO workshopRound (workshopId, roundId, amountOfStudents, amountOfTeachers) VALUES (?, ?, ?,?)';

            logger.debug('query', query);

            connection.query(
                query,
                values,
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        // TODO: Implement correct logging for possible error cases
                        logger.error('Error creating workshop for round', error);
                        callback(error, null);

                    } else {
                        // Get the last inserted id for logging
                        // const commissionId = results.insertId;
                        logger.trace('workshop for round created', roundId);

                        // const commissionDataWithId = {...commission, Id: commissionId};
                        callback(null, {
                            status: 200,
                            message: 'workshop for round created',
                            data: results,
                        });
                    }
                }
            )
        });
    },

    getWorkshopsRoundById: (roundId, callback) => {
        logger.info('Get all workshops from round', roundId);

        let sql = 'SELECT workshop.* FROM workshop JOIN workshopRound ON workshop.id = workshopRound.workshopId WHERE workshopRound.roundId = ?';

        database.query(sql, [roundId], (error, results, fields) => {
            if (error) {
                logger.error('Error getting workshops', error);
                callback(error, null);

            } else {
                if (results.length > 0) {
                    logger.info('Workshops fetched successfully', results[0]);
                    callback(null, {
                        status: 200,
                        message: 'Workshops fetched successfully',
                        data: results,
                    });
                } else {
                    logger.warn('No workshops found with round id', roundId);
                    callback({
                        status: 404,
                        message: 'workshops not found',
                    }, null);
                }
            }
        });
    }

};

module.exports = workshopRound;