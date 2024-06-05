const express = require("express");
const router = express.Router();
const teacherWorkshopQualificationController = require("../controller/teacherWorkshopQualification.controller");

router.get("/api/teacherWorkshopQualification/:id", teacherWorkshopQualificationController.getAllByCustomerId);


module.exports = router;
