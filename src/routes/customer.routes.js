const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const customerController = require("../controller/customer.controller");


router.post("/api/customer/contact/:id", customerController.updateContactPersons);
router.get("/api/customer/contact/:id", customerController.getAllContactPersonsByCustomerId);
router.get("/api/customer", customerController.getAllCustomers);
router.post("/api/customer", customerController.createCustomer);
router.get("/api/customer/:id", customerController.getCustomerById);
router.put("/api/customer/:id", customerController.updateCustomer);
module.exports = router;