const express = require("express");
const router = express.Router();
const roundController = require("../controller/round.controller");

router.get("/api/round/commission/:id", roundController.getAllRoundsFromCommission);
router.post("/api/round/:id", roundController.createRound);
router.delete("/api/round/:id", roundController.deleteRound);
router.put("/api/round/:id", roundController.editRound);
router.get("/api/round/:id", roundController.getRoundById);

module.exports = router;