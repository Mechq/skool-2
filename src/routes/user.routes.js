const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/api/user", userController.getAllUsers);
router.put("/api/user/:id", userController.updateUser);
router.get("/api/user/:id", userController.getById);
module.exports = router;