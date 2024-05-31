const express = require("express");
const router = express.Router();
const roundController = require("../controller/round.controller");

router.get("/api/round/:id", roundController.getAllRoundsFromCommission);
router.post("/api/round/:id", roundController.createRound);
router.delete("/api/round/:id", roundController.deleteRound);

module.exports = router;