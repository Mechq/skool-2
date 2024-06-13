const database = require("../database/database.connection");
const logger = require("../util/logger");

const workshopRound = {
  create: (roundId, workshopId, workshopRound, callback) => {
    logger.info("creating workshop for round", workshopRound);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error("Error creating workshop for round", err);
        callback(err, null);
        return;
      }
      const { commissionId } = workshopRound;

      const values = [workshopId, roundId];

      // TODO: Implement the query to insert correct data
      const query =
          "INSERT INTO workshopRound (workshopId, roundId) VALUES (?,?)";

      logger.debug("query", query);

      connection.query(query, values, function (error, results, fields) {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            logger.warn("Duplicate entry key error:", error);
          } else {
            logger.error("Error creating workshop for round", error);
            callback(error, null);
            connection.release();
            return;
          }
        }

        // Add to commissionWorkshop
        connection.query(`INSERT INTO commissionWorkshop (workshopId, commissionId) VALUES(?, ?)`, [workshopId, commissionId], function (error, results2, fields) {
          if (error) {
            logger.error("Error creating userWorkshop entry", error);
            callback(error, null);
          } else {
            logger.trace("userWorkshop entry created");
            callback(null, {
              status: 200,
              message: "workshop for round created",
              data: results
            });
          }
          connection.release();
        });
      });
    });
  },



  getWorkshopsRoundById: (roundId, callback) => {
    logger.info("Get all workshops from round", roundId);

    let sql =
      "SELECT workshop.* FROM workshop JOIN workshopRound ON workshop.id = workshopRound.workshopId WHERE workshopRound.roundId = ?";

    database.query(sql, [roundId], (error, results, fields) => {
      if (error) {
        logger.error("Error getting workshops", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          logger.info("Workshops fetched successfully", results);
          callback(null, {
            status: 200,
            message: "Workshops fetched successfully",
            data: results,
          });
        } else {
          logger.debug("No workshops found with round id", roundId);
          callback(null, {
            status: 200,
            message: "No workshops found for round id " + roundId,
            data: [],
          });
        }
      }
    });
  },

  deleteWorkshopRoundWorkshopsByRoundId: (roundId, callback) => {
    logger.info("Deleting workshops from round by roundId", roundId);

    const query = "DELETE FROM workshopRound WHERE roundId = ?";

    database.query(query, [roundId], (error, results, fields) => {
      if (error) {
        logger.error("Error deleting workshops from round", error);
        callback(error, null);
      } else {
        logger.info("Workshops deleted successfully");
        callback(null, {
          status: 200,
          message: "Workshops deleted successfully",
          data: results,
        });
      }
    });
  },
  // check if in workshopRound table the workshop id and commission id exists more then once if no:
  // delete workshopCommission by workshop id and commission Id

  deleteWorkshopCommission: (workshopId, commissionId, callback) => {
    logger.info("Deleting workshop ", workshopId, " and commission ", commissionId);

    const query_first = "SELECT id FROM `round` WHERE commissionId = ? AND type = 'Workshopronde';"
    // ? = commissionId

    // Note the change here: We will not use a single placeholder for an array of values.
    const query_second = "SELECT count(*) AS count FROM `workshopRound` WHERE roundId IN (?) AND workshopId = ?;"
    // ? = results from query_first, ? = workshopId

    const query_third = "DELETE FROM commissionWorkshop WHERE workshopId = ? AND commissionId = ?;";
    // ? = workshopId, ? = commissionId

    database.query(query_first, [commissionId], (error, results, fields) => {
      if (error) {
        logger.error("Error selecting rounds for deletion", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          const roundIds = results.map(result => result.id);
          logger.info("Round IDs found: ", roundIds);

          database.query(query_second, [roundIds, workshopId], (error, results, fields) => {
            if (error) {
              logger.error("Error counting workshop rounds", error);
              callback(error, null);
            } else {
              const count = results[0].count;
              logger.info("Count of workshop rounds: ", count);

              if (count === 1) {
                database.query(query_third, [workshopId, commissionId], (error, results, fields) => {
                  if (error) {
                    logger.error("Error deleting workshopCommission", error);
                    callback(error, null);
                  } else {
                    logger.info("WorkshopCommission deleted successfully");
                    callback(null, {
                      status: 200,
                      message: "WorkshopCommission deleted successfully",
                      data: results,
                    });
                  }
                });
              } else {
                logger.info("WorkshopCommission not deleted");
                callback(null, {
                  status: 200,
                  message: "WorkshopCommission not deleted",
                  data: results,
                });
              }
            }
          });
        } else {
          logger.info("No rounds found for the given commission ID");
          callback(null, {
            status: 404,
            message: "No rounds found for the given commission ID",
            data: results,
          });
        }
      }
    });
  },



  editWorkshopRoundWorkshop: (workshopId, commissionId, workshopRound, callback) => {
    logger.info('workshopId', workshopId);
    logger.info('roundId', commissionId);
    logger.info("Editing workshop for round", workshopRound);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error("Error editing workshop for round", err);
        callback(err, null);
        return;
      }

      const { amountOfTeachers, amountOfStudents } = workshopRound;
      const values = [];
      let sql = "UPDATE commissionWorkshop SET ";

      if (amountOfTeachers !== undefined) {
        sql += "amountOfTeachers = ?, ";
        values.push(amountOfTeachers);
      }

      if (amountOfStudents !== undefined) {
        sql += "amountOfStudents = ?, ";
        values.push(amountOfStudents);
      }

      // Remove the trailing comma and space
      sql = sql.slice(0, -2);

      sql += " WHERE workshopId = ? AND commissionId = ?";
      values.push(workshopId, commissionId);

      logger.debug("sql", sql);
      logger.debug("values", values);

      connection.query(sql, values, (error, results, fields) => {
        connection.release(); 

        if (error) {

            logger.error('Error updating workshopRound', error);
            callback(error, null);

        } else {
            callback(null, {
                status: 200,
                message: 'Updated workshopRound successfully',
                data: results,
            });
        }
      });
    });
  },

  getWorkshopRoundWorkshopById: (workshopId, roundId, callback) => {
    logger.info("Get workshop for round", workshopId, roundId);

    let sql =
      "SELECT * FROM workshopRound WHERE workshopId = ? AND roundId = ?";

    database.query(sql, [workshopId, roundId], (error, results, fields) => {
      if (error) {
        logger.error("Error getting workshop for round", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          logger.info("WorkshopTemplates for round fetched successfully", results);
          callback(null, {
            status: 200,
            message: "WorkshopTemplates for round fetched successfully",
            data: results[0],
          });
        } else {
          logger.debug("No workshop found with workshop id", workshopId);
          callback(null, {
            status: 200,
            message: "No workshop found for workshop id " + workshopId,
            data: [],
          });
        }
      }
    });
  }
};

module.exports = workshopRound;
