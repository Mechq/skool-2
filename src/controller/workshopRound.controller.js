const logger = require("../util/logger");
const workshopRoundService = require("../service/workshopRound.service");
let workshopRoundController = {
  create: (req, res, next) => {
    const workshopRound = req.body;
    const workshopId = req.params.workshopId;
    const roundId = req.params.roundId;

    // Need to improve the logging here. No need to log the entire workshop object.
    logger.info("creating workshop for round", workshopRound);

    workshopRoundService.create(
      roundId,
      workshopId,
      workshopRound,
      (error, success) => {
        if (error) {
          return next({
            status: error.status,
            message: error.message,
            data: {},
          });
        }

        if (success) {
          res.status(200).json({
            status: success.status,
            message: success.message,
            data: success.data,
          });
        }
      }
    );
  },

  getWorkshopsRoundById: (req, res, next) => {
    const roundId = req.params.roundId;
    logger.debug("roundId", roundId);

    logger.info("retrieving workshops from round by roundId", roundId);

    workshopRoundService.getWorkshopsRoundById(roundId, (error, success) => {
      if (error) {
        return next({
          status: error.status,
          message: error.message,
          data: {},
        });
      }

      if (success) {
        res.status(200).json({
          status: success.status,
          message: success.message,
          data: success.data,
        });
      }
    });
  },

  deleteWorkshopRoundWorkshopsByRoundId: (req, res, next) => {
    const roundId = req.params.roundId;
    logger.debug("roundId", roundId);

    logger.info("deleting workshops from round by roundId", roundId);

    workshopRoundService.deleteWorkshopRoundWorkshopsByRoundId(
      roundId,
      (error, success) => {
        if (error) {
          return next({
            status: error.status,
            message: error.message,
            data: {},
          });
        }

        if (success) {
          res.status(200).json({
            status: success.status,
            message: success.message,
            data: success.data,
          });
        }
      }
    );
  },

  editWorkshopRoundWorkshop: (req, res, next) => {
    const workshopRoundWorkshop = req.body;
    const workshopId = req.params.workshopId;
    const roundId = req.params.roundId;

    logger.info("editing workshop for round", workshopRoundWorkshop);

    workshopRoundService.editWorkshopRoundWorkshop(
      workshopId,
      roundId,
      workshopRoundWorkshop,
      (error, success) => {
        if (error) {
          return next({
            status: error.status,
            message: error.message,
            data: {},
          });
        }

        if (success) {
          res.status(200).json({
            status: success.status,
            message: success.message,
            data: success.data,
          });
        }
      }
    );
  },

  getWorkshopRoundWorkshopById: (req, res, next) => {
    const workshopId = req.params.workshopId;
    const roundId = req.params.roundId;

    logger.info("getting workshop for round by workshopId and roundId", workshopId, roundId);

    workshopRoundService.getWorkshopRoundWorkshopById(
      workshopId,
      roundId,
      (error, success) => {
        if (error) {
          return next({
            status: error.status,
            message: error.message,
            data: {},
          });
        }

        if (success) {
          res.status(200).json({
            status: success.status,
            message: success.message,
            data: success.data,
          });
        }
      }
    );
  }
};

module.exports = workshopRoundController;
