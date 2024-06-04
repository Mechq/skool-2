const roundService = require("../service/round.service");
const logger = require("../util/logger");

let roundController = {
  createRound: (req, res, next) => {
    const round = req.body;
    const commissionId = req.params.id;
    logger.info("creating round", round);

    roundService.create(commissionId, round, (error, success) => {
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

  getAllRoundsFromCommission: (req, res, next) => {
    const id = req.params.id;
    logger.info("retrieving rounds from commission", id);

    roundService.getAllRoundsFromCommission(id, (error, success) => {
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

  deleteRound: (req, res, next) => {
    const id = req.params.id;
    logger.info("deleting round", id);

    roundService.deleteRound(id, (error, success) => {
      if (error) {
        return next({
          status: error.status || 500,
          message: error.message || "Internal Server Error",
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

  editRound: (req, res, next) => {
    const id = req.params.id;
    const round = req.body;
    logger.info("editing round", id);

    roundService.editRound(id, round, (error, success) => {
      if (error) {
        return next({
          status: error.status || 500,
          message: error.message || "Internal Server Error",
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

  getRoundById: (req, res, next) => {
    const id = req.params.id;
    logger.info("retrieving round by id", id);

    roundService.getRoundById(id, (error, success) => {
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
  startTimeRound: (req, res, next) => {
    const roundId = req.params.roundId;
    const startTime = req.body.startTime;

    logger.info("starting time for round", roundId);

    roundService.startTimeRound(roundId, startTime, (error, success) => {
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
  endTimeRound: (req, res, next) => {
    const commissionId = req.params.commissionId;

    logger.info("ending time for round", commissionId);

    roundService.endTimeRound(commissionId, (error, success) => {
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
  }
};

module.exports = roundController;
