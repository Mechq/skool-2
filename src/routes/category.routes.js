const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

router.get("/api/category", categoryController.getAllCategories);
router.get("/api/category/:id", categoryController.getCategoryById);

module.exports = router;
