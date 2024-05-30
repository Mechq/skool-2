const express = require("express");
const router = express.Router();
const roundController = require("../controller/round.controller");

router.get("/api/route/:commissionId", roundController.getAllRoundsFromCommission);
router.post("/api/route", roundController.createRound);

module.exports = router;