const express = require("express");
const router = express.Router();
const commissionController = require("../controller/commission.controller");

router.get("/api/commission",commissionController.getAllCommissions);
router.post("/api/commission", commissionController.createCommission);
router.get("/api/commission/:id", commissionController.getCommissionById);

module.exports = router;
