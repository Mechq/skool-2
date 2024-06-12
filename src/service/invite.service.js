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
    },

    getInvites: (userId, callback) => {
        logger.info("fetching invites for user", userId);

        database.getConnection(function (err, connection) {
            if (err) {
              logger.error("Error fetching invites for user", err);
              callback(err, null);
              return;
            }
      
            connection.query(
              `SELECT workshop.name AS workshopName, commission.date, customer.name AS customerName, location.name AS locationName, invite.id AS inviteId, commissionWorkshop.id AS commissionWorkshopId FROM invite JOIN commissionWorkshop ON invite.commissionWorkshopId = commissionWorkshop.id JOIN commission ON commissionWorkshop.commissionId = commission.id JOIN customer ON commission.customerId = customer.id JOIN workshop ON commissionWorkshop.workshopId = workshop.id JOIN location ON commission.locationId = location.id WHERE invite.userId = ? AND invite.status = 'open';`,
              [userId],
              function (error, results, fields) {
                connection.release();
      
                if (error) {
                  logger.error("Error fetching invites for user", error);
                  callback(error, null);
                } else {
                  callback(null, {
                    status: 200,
                    message: `Fetched invites for user ${userId}`,
                    data: results,
                  });
                }
              }
            );
          });
    },

    updateInvite: (inviteId, status, callback) => {
        logger.info("updating invite", inviteId, status);

        database.getConnection(function (err, connection) {
            if (err) {
              logger.error("Error updating invite", err);
              callback(err, null);
              return;
            }
      
            connection.query(
              `UPDATE invite SET status = ? WHERE id = ?`,
              [status, inviteId],
              function (error, results, fields) {
                connection.release();
      
                if (error) {
                  logger.error("Error updating invite", error);
                  callback(error, null);
                } else {
                  callback(null, {
                    status: 200,
                    message: `Invite ${inviteId} updated to status ${status}`,
                    data: results,
                  });
                }
              }
            );
          });
    },

    deleteInvite: (inviteId, callback) => {
        logger.info("deleting invite", inviteId);

        database.getConnection(function (err, connection) {
            if (err) {
              logger.error("Error deleting invite", err);
              callback(err, null);
              return;
            }
      
            connection.query(
              `DELETE FROM invite WHERE id = ?`,
              [inviteId],
              function (error, results, fields) {
                connection.release();
      
                if (error) {
                  logger.error("Error deleting invite", error);
                  callback(error, null);
                } else {
                  callback(null, {
                    status: 200,
                    message: `Invite ${inviteId} deleted`,
                    data: results,
                  });
                }
              }
            );
          });
    }
}

module.exports = inviteService;