const express = require("express");
const router = express.Router();
const workshopRoundController = require("../controller/workshopRound.controller");


router.post("/api/workshopRound/:workshopId/:roundId", workshopRoundController.create);
router.get("/api/workshopRound/workshop/:roundId", workshopRoundController.getWorkshopsRoundById);
router.delete("/api/workshopRound/workshop/:roundId", workshopRoundController.deleteWorkshopRoundWorkshopsByRoundId);
router.put('/api/workshopRound/:workshopId/:commissionId', workshopRoundController.editWorkshopRoundWorkshop)
router.get('/api/workshopRound/:workshopId/:roundId', workshopRoundController.getWorkshopRoundWorkshopById)

module.exports = router;
