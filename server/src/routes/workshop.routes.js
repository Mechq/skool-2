const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const workshopController = require("../controller/workshop.controller");

function validateWorkshop(req, res, next) {
    const { name, description, materials, category } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: "Name is required and must be a string." });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({ error: "Description is required and must be a string." });
    }

    if (!materials || typeof materials !== 'string') {
        return res.status(400).json({ error: "Materials is required and must be a string." });
    }

    if (!category || typeof category !== 'string') {
        return res.status(400).json({ error: "Category is required and must be a string." });
    }

    next();
}

router.post("/api/workshop", validateWorkshop, workshopController.createWorkshop);

router.get("/api/workshop", workshopController.getAllWorkshops);
module.exports = router;
