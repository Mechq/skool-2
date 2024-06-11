const express = require("express");
const router = express.Router();
const languageController = require("../controller/language.controller");

router.get("/api/language", languageController.getAllLanguages);
router.post("/api/language/:userEmail", languageController.setLanguages)

module.exports = router;
