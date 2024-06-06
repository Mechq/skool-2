const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render('index.html')
});

router.get("/workshops", (req, res, next) => {
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

router.get('/user', (req, res, next) => {
    res.render('index.html')
});

router.get('/users', (req, res, next) => {
    res.render('index.html')
});

router.get("/register", (req, res, next) => {
    res.render('index.html')
});

router.get("/login", (req, res, next) => {
    res.render('index.html')
});




module.exports = router;