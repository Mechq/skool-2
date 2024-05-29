const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const mailTemplateController = require("../controller/mailTemplate.controller");

function validateMailTemplate(req, res, next) {
    const { subject, cc, details } = req.body;

    if (!subject || typeof subject !== 'string') {
        return res.status(400).json({ error: "Subject is required and must be a string." });
    }

    if (!cc || typeof cc !== 'string') {
        return res.status(400).json({ error: "Cc is required and must be a string." });
    }

    if (!details || typeof details !== 'string') {
        return res.status(400).json({ error: "Details is required and must be a string." });
    }

    next();
}

router.get("/api/mailTemplate", mailTemplateController.getAllMailTemplates);
router.post("/api/mailTemplate", validateMailTemplate, mailTemplateController.createMailTemplate);
router.put("/api/mailTemplate/:id", mailTemplateController.update);
router.get("/api/mailTemplate/:id", mailTemplateController.getMailTemplateById);

module.exports = router;
