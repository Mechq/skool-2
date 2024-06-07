const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboard.controller");

router.get('/api/dashboard/:teacherId', dashboardController.getCommissionsWorkshopsByTeacherId);

module.exports = router;