const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshop.controller");

function validateWorkshop(req, res, next) {
    const {name, description, materials, category} = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({error: "Name is required and must be a string."});
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({error: "Description is required and must be a string."});
    }

    if (!materials || typeof materials !== 'string') {
        return res.status(400).json({error: "Materials is required and must be a string."});
    }

    if (!category || typeof category !== 'string') {
        return res.status(400).json({error: "Category is required and must be a string."});
    }
    next();
}

router.post("/api/workshop", validateWorkshop, workshopController.createWorkshop);
router.post("/api/workshop/commission/:workshopId/:commissionId", workshopController.createEnrollment);
router.get("/api/workshop", workshopController.getAllWorkshops);
router.get("/api/workshop/commission", workshopController.getWorkshopCommission);
router.get("/api/workshop/commission/user/:userId", workshopController.getWorkshopCommissionWhereNotEnrolled);
router.get("/api/workshop/commission/:workshopId/:commissionId", workshopController.getWorkshopCommissionById);
router.get("/api/workshop/enrollment/:workshopId/:commissionId", workshopController.getEnrollmentCount);
router.put("/api/workshop/:id", workshopController.update);
router.get("/api/workshop/:id", workshopController.getWorkshopById);
router.delete("/api/workshop/:id", workshopController.deleteWorkshop);
router.get("/api/commissionWorkshop", workshopController.getAllCommissionWorkshops);

module.exports = router;
