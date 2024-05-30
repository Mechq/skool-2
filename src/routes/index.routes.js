const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render('index.html')
});

router.get("/workshops", (req, res, next) => {
    res.render('index.html')
});

router.get("/", (req, res, next) => {
    res.render('index.html')
});

module.exports = router;