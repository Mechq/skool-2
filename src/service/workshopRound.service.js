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

      const { amountOfTeachers, amountOfStudents } = workshopRound;

      const values = [workshopId, roundId, amountOfStudents, amountOfTeachers];

      // TODO: Implement the query to insert correct data
      const query =
        "INSERT INTO workshopRound (workshopId, roundId, amountOfStudents, amountOfTeachers) VALUES (?, ?, ?,?)";

      logger.debug("query", query);

      connection.query(query, values, function (error, results, fields) {
        connection.release();

        if (error) {
          // TODO: Implement correct logging for possible error cases
          logger.error("Error creating workshop for round", error);
          callback(error, null);
        } else {
          // Get the last inserted id for logging
          // const commissionId = results.insertId;
          logger.trace("workshop for round created", roundId);

          // const commissionDataWithId = {...commission, Id: commissionId};
          callback(null, {
            status: 200,
            message: "workshop for round created",
            data: results,
          });
        }
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

  editWorkshopRoundWorkshop: (workshopId, roundId, workshopRound, callback) => {
    logger.info('workshopId', workshopId);
    logger.info('roundId', roundId);
    logger.info("Editing workshop for round", workshopRound);

    database.getConnection(function (err, connection) {
      if (err) {
        logger.error("Error editing workshop for round", err);
        callback(err, null);
        return;
      }

      const { amountOfTeachers, amountOfStudents } = workshopRound;
      const values = [];
      let sql = "UPDATE workshopRound SET ";

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

      sql += " WHERE workshopId = ? AND roundId = ?";
      values.push(workshopId, roundId);

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
};

module.exports = workshopRound;
