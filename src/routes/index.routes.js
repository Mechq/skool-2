const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const categoryController = require("../controller/category.controller");

router.get("/", (req, res, next) => {
    res.render('index.html')
});

module.exports = router;
