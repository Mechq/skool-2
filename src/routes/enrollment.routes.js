const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const enrollmentController = require("../controller/enrollment.controller");

router.get('/api/enrollment/', enrollmentController.getAllEnrollments);
router.put('/api/enrollment/:id', enrollmentController.updateEnrollment);
router.post('/api/enrollment/', enrollmentController.createEnrollment);
router.get('/api/enrollment/user/:userId', enrollmentController.getUserEnrollments);
module.exports = router;