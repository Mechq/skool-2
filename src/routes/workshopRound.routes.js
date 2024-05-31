const express = require("express");
const router = express.Router();
const workshopRoundController = require("../controller/workshopRound.controller");


router.post("/api/workshopRound/:workshopId/:roundId", workshopRoundController.create);
module.exports = router;
