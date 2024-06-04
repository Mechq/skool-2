const database = require('../database/database.connection');
const logger = require('../util/logger');

const roundService = {
    create: (commissionId, round, callback) => {
        logger.info('creating round ' ,round);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error creating round', err);
                callback(err, null);
                return;
            }

            const {
                type,
                duration,
                startTime
            } = round;

            const values = [type, commissionId, duration, startTime];

            const query = 'INSERT INTO round (type,commissionId,duration,startTime) VALUES (?,?,?,?)';

            logger.debug('query', query);

            connection.query(
                query,
                values,
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        logger.error('Error creating round', error);
                        callback(error, null);

                    } else {
                        // Get the last inserted id for logging
                        // const workshopId = results.insertId;
                        logger.trace('round created ', results.id);

                        const roundIdData = {...results, roundId: round.id};
                        callback(null, {
                            status: 200,
                            message: 'round created',
                            data: roundIdData
                        });
                    }
                }
            )
        });
    },

    getAllRoundsFromCommission: (commissionId, callback) => {
        logger.info('get all rounds for commission', commissionId);

        database.getConnection(function (err, connection) {
            if (err) {
                logger.error('Error getting rounds', err);
                callback(err, null);
                return;
            }


            connection.query(
                'SELECT * FROM round WHERE commissionId = ?', [commissionId],
                function (error, results, fields) {
                    connection.release();

                    if (error) {

                        logger.error('Error getting rounds', error);
                        callback(error, null);

                    } else {
                        callback(null, {
                            status: 200,
                            message: `${results.length} rounds retrieved`,
                            data: results,
                        });
                    }
                }
            )
        });
    },

    editRound: (roundId, round, callback) => {
      logger.info('Updating round', round);
      logger.info('Round ID', roundId);

      let sql = 'UPDATE round SET ';
      const values = [];

      if (round.duration !== undefined) {
          sql += 'duration = ?, ';
          values.push(round.duration);
      }
      if (round.startTime !== undefined) {
          sql += 'startTime = ?, ';
          values.push(round.startTime);
      }
      if (round.endTime !== undefined) {
        sql += 'endTime = ?, ';
        values.push(round.endTime);
      }
  
      // Remove the trailing comma and space
      sql = sql.slice(0, -2);
  
      sql += ' WHERE id = ?';
      values.push(roundId);
  
      logger.info('SQL query', sql);
      logger.info('Values', values);
  
      database.getConnection((err, connection) => {
          if (err) {
              logger.error('Error getting database connection', err);
              callback(err, null);
              return;
          }
  
          connection.query(sql, values, (error, results, fields) => {
              connection.release(); 
  
              if (error) {

                logger.error('Error updating round', error);
                callback(error, null);

            } else {
                callback(null, {
                    status: 200,
                    message: 'Round updated',
                    data: results,
                });
            }
          });
      });
  },
    

    deleteRound: (id, callback) => {
        logger.info("deleting round", id);
    
        database.getConnection((err, connection) => {
          if (err) {
            logger.error("Error deleting round", err);
            callback(err, null);
            return;
          }
    
          connection.query(
            "DELETE FROM round WHERE id = ?",
            [id],
            (error, results, fields) => {
              connection.release();
    
              if (error) {
                logger.error("Error deleting round", error);
                callback(error, null);
              } else {
                if (results.affectedRows === 0) {
                  // No rows were affected, implying the round does not exist
                  const notFoundError = {
                    status: 404,
                    message: 'Round not found',
                  };
                  logger.warn("Round not found", id);
                  callback(notFoundError, null);
                } else {
                  callback(null, {
                    status: 200,
                    message: 'Round deleted',
                    data: results,
                  });
                }
              }
            }
          );
        });
      },

      getRoundById: (id, callback) => {
        logger.info("retrieving round by id", id);
    
        database.getConnection((err, connection) => {
          if (err) {
            logger.error("Error getting database connection", err);
            callback(err, null);
            return;
          }
    
          connection.query(
            "SELECT * FROM round WHERE id = ?",
            [id],
            (error, results, fields) => {
              connection.release();
    
              if (error) {
                logger.error("Error getting round", error);
                callback(error, null);
              } else {
                if (results.length > 0) {
                  logger.info("Round fetched successfully", results);
                  callback(null, {
                    status: 200,
                    message: "Round fetched successfully",
                    data: results[0],
                  });
                } else {
                  logger.debug("No round found with id", id);
                  callback(null, {
                    status: 200,
                    message: "No round found with id " + id,
                    data: {},
                  });
                }
              }
            }
          );
        });
      },

      startTimeRound: (roundId, startTime, callback) => {
        logger.info("starting time for round", roundId);
    
        database.getConnection((err, connection) => {
          if (err) {
            logger.error("Error getting database connection", err);
            callback(err, null);
            return;
          }
    
          connection.query(
            "UPDATE round SET startTime = ? WHERE id = ?",
            [startTime, roundId],
            (error, results, fields) => {
              connection.release();
    
              if (error) {
                logger.error("Error starting time for round", error);
                callback(error, null);
              } else {
                callback(null, {
                  status: 200,
                  message: "Round start time updated",
                  data: results,
                });
              }
            }
          );
        });
      },

      endTimeRound: (commissionId, callback) => {
        logger.info("getting ending time for round", commissionId);
    
        database.getConnection((err, connection) => {
          if (err) {
            logger.error("Error getting database connection", err);
            callback(err, null);
            return;
          }
    
          sql = "select `endTime` from round where commissionId = ? ORDER BY `order` desc LIMIT 1";

          connection.query(sql,
            [commissionId],
            (error, results, fields) => {
              connection.release();
    
              if (error) {
                logger.error("Error getting endTime", error);
                callback(error, null);
              } else {
                if (results.length > 0) {
                  logger.info("endTime fetched successfully", results);
                  callback(null, {
                    status: 200,
                    message: "endTime fetched successfully",
                    data: results[0],
                  });
                } else {
                  logger.debug("No endTime found with commissionId", commissionId);
                  callback(null, {
                    status: 200,
                    message: "No endTime found with commissionId", commissionId,
                    data: {},
                  });
                }
              }
            }
          );
      })
    }
};

module.exports = roundService;
