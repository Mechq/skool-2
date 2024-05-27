const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const workshopController = require("../controller/mailTemplate.controller");

router.post("/api/mailTemplate", mailTemplate.createWorkshop);

module.exports = router;
