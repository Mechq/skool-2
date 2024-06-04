const express = require("express");
const router = express.Router();

router.get("/workshops", (req, res, next) => {
    res.render('index.html')
});

router.get("/", (req, res, next) => {
    res.render('index.html')
});

router.get('/mailTemplates', (req, res, next) => {
    res.render('index.html')
});

router.get('/opdracht', (req, res, next) => {
    res.render('index.html')
});

router.get('/werklocatie', (req, res, next) => {
    res.render('index.html')
});

router.get('/customers', (req, res, next) => {
    res.render('index.html')
});



module.exports = router;