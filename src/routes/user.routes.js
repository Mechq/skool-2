const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const bcrypt = require('bcrypt');
const authMiddleware = require('../auth.middleware');

router.get('/api/hash', (req, res) => {
    bcrypt.hash('password', 10, (err, hash) => {
        if (err) return res.json({'Error in hashing': err});
        return res.json({result: hash});
    });
});
router.post("/api/verifyToken", authMiddleware)
router.post('/api/register', userController.register);
router.post('/api/login', userController.login);

module.exports = router;