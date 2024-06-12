const express = require('express'); 
const router = express.Router();
const inviteController = require('../controller/invite.controller');

router.post('/api/invite/workshop/:workshopId/user/:userId', inviteController.invite);

module.exports = router;