const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const workshopController = require("../controller/workshop.controller");

// router.post("/api/workshop", workshopController.createWorkshop);
router.put("/api/workshop", workshopController.update);
module.exports = router;
