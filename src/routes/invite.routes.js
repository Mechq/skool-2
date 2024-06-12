const express = require('express'); 
const router = express.Router();
const inviteController = require('../controller/invite.controller');

router.post('/api/invite/workshop/:workshopId/user/:userId', inviteController.invite);
router.get('/api/invite/user/:userid', inviteController.getInvites);
router.put('/api/invite/:inviteId', inviteController.updateInvite);

module.exports = router;