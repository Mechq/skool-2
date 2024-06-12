const logger = require('../util/logger');
const database = require("../database/database.connection");

let inviteService = {
    invite: (workshopId, userId, callback) => {
        logger.info("inviting user to workshop", userId, workshopId);

        database.getConnection(function (err, connection) {
            if (err) {
              logger.error("Error inviting user to workshop", err);
              callback(err, null);
              return;
            }
      
            connection.query(
              `INSERT INTO invite (userId, commissionWorkshopId, status) VALUES (?, ?, 'open')`,
              [userId, workshopId],
              function (error, results, fields) {
                connection.release();
      
                if (error) {
                  logger.error("Error inviting user to workshop", error);
                  callback(error, null);
                } else {
                  callback(null, {
                    status: 200,
                    message: `User ${userId} invited to workshop ${workshopId}`,
                    data: results,
                  });
                }
              }
            );
          });
    }
}

module.exports = inviteService;