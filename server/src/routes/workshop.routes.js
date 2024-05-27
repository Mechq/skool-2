const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const workshopController = require("../controller/workshop.controller");

function validateWorkshop(req, res, next) {
    const { name, description, date, location } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: "Name is required and must be a string." });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({ error: "Description is required and must be a string." });
    }

    if (!date || typeof date !== 'string') {
        return res.status(400).json({ error: "Date is required and must be a string." });
    }

    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: "Location is required and must be a string." });
    }

    next();
}

router.post("/api/workshop", validateWorkshop, workshopController.createWorkshop);

module.exports = router;
