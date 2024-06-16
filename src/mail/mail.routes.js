const express = require("express");
const router = express.Router();

const { sendEmail } = require("../mail/mail.controller");

router.post("/api/mail", sendEmail);

module.exports = router;