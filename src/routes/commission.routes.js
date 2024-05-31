const express = require("express");
const router = express.Router();
const commissionController = require("../controller/commission.controller");

router.get("/api/commission",commissionController.getAllCommissions);
router.post("/api/commission", commissionController.createCommission);
router.get("/api/commission/:id", commissionController.getCommissionById);
router.put("/api/commission/:id", commissionController.update);
module.exports = router;
