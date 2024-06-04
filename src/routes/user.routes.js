const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/api/user", userController.getAllUsers);

module.exports = router;