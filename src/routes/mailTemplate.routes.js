const express = require("express");
const router = express.Router();
const mailTemplateController = require("../controller/mailTemplate.controller");

router.get("/api/mailTemplate", mailTemplateController.getAllMailTemplates);
router.post("/api/mailTemplate", mailTemplateController.createMailTemplate);
router.get("/api/mailTemplate/:id", mailTemplateController.getById);
router.put("/api/mailTemplate/:id", mailTemplateController.update);

module.exports = router;