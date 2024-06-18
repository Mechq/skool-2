const express = require("express");
const router = express.Router();

const { sendEmail , scheduleEmail} = require("../mail/mail.controller");

router.post("/api/mail", sendEmail);
router.post("/api/schedule-mail", scheduleEmail);


module.exports = router;