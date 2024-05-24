const express = require("express");
const router = express.Router();
const logger = require("../util/logger");

router.post("/api/workshop", workshopController.createWorkshop);

module.exports = router;
