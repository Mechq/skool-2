const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const mailTemplateController = require("../controller/mailTemplate.controller");

router.get("/api/mailTemplate", mailTemplateController.getAllMailTemplates);
router.post("/api/mailTemplate", mailTemplateController.createMailTemplate);

module.exports = router;