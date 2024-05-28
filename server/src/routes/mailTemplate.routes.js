const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const mailTemplateController = require("../controller/mailTemplate.controller");

router.post("/api/mailTemplate", mailTemplateController.createMailTemplate);

module.exports = router;
