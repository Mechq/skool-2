const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const customerController = require("../controller/customer.controller");

// router.get("/api/customer", customerController.getAllCustomers);
router.post("/api/customer", customerController.createCustomer);

module.exports = router;