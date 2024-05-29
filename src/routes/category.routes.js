const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const categoryController = require("../controller/category.controller");

router.get("/api/category", categoryController.getAllCategories);

module.exports = router;
