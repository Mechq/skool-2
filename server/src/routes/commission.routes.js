const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const commissionController = require("../controller/commission.controller");

router.get("/api/commission",commissionController.getAllCommissions);
// router.post("/api/mailTemplate", mailTemplateController.createMailTemplate);

module.exports = router;
