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

router.post("/api/verifyToken", authMiddleware, (req, res) => {
    res.status(200).json({ status: 200, message: 'Authorized' });
});

// router.get("/api/user", (req, res) => {
//     res.status(200).json({ status: 200, message: 'Authorized' });
// });

router.post('/api/register', userController.register);
router.post('/api/login', userController.login);
router.get("/api/user", userController.getAllUsers);
router.put("/api/user/:id", userController.updateUser);
router.get("/api/user/:id", userController.getById);
router.get("/api/user/email/:email", userController.getByEmail);
router.get('/api/user/language/:id', userController.getLanguages);
router.get('/api/user/language/:id', userController.getLanguages);
router.post('/api/user/accept/:id', userController.accept);
router.delete('/api/user/delete/:id', userController.delete);

module.exports = router;