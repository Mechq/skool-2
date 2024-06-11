const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboard.controller");

router.get('/api/dashboard/:teacherId', dashboardController.getCommissionsWorkshopsByTeacherId);
router.delete('/api/enrollment/:commissionWorkshopId/:userId', dashboardController.deleteEnrollmentById);

module.exports = router;