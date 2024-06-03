const express = require("express");
const router = express.Router();
const workshopRoundController = require("../controller/workshopRound.controller");


router.post("/api/workshopRound/:workshopId/:roundId", workshopRoundController.create);
router.get("/api/workshopRound/workshop/:roundId", workshopRoundController.getWorkshopsRoundById);
router.delete("/api/workshopRound/workshop/:roundId", workshopRoundController.deleteWorkshopsRoundById);

module.exports = router;
