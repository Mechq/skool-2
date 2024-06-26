const express = require("express");
const router = express.Router();
const teacherWorkshopQualificationController = require("../controller/teacherWorkshopQualification.controller");

router.get("/api/teacherWorkshopQualification/:id", teacherWorkshopQualificationController.getAllByCustomerId);
router.post("/api/teacherWorkshopQualification/:id", teacherWorkshopQualificationController.create);
router.delete("/api/teacherWorkshopQualification/:userId", teacherWorkshopQualificationController.delete);
router.get("/api/teacherWorkshopQualification/workshop/:workshopId", teacherWorkshopQualificationController.getAllByWorkshopId);
module.exports = router;
