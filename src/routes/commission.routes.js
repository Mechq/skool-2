const express = require("express");
const router = express.Router();
const commissionController = require("../controller/commission.controller");

router.get("/api/commission",commissionController.getAllCommissions);
router.post("/api/commission", commissionController.createCommission);
router.get("/api/commission/durations", commissionController.getDurations)
router.get("/api/commission/:id", commissionController.getCommissionById);
router.put("/api/commission/:id", commissionController.update);
router.get("/api/commission/customer/:commissionId", commissionController.getCustomer);
router.get("/api/commission/time/:commissionId", commissionController.getStartAndEndTime);
router.delete("/api/commission/:id", commissionController.deleteCommission);
router.post("/api/commission/date/:id", commissionController.updateCommissionDates)
router.get("/api/commission/contact/:commissionId", commissionController.getContactPersonByCommissionId);

module.exports = router;
