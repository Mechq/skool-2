const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const enrollmentController = require("../controller/enrollment.controller");

router.get('/api/enrollment/', enrollmentController.getAllEnrollments);

module.exports = router;