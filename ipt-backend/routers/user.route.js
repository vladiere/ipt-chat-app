const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/get/all', verifyToken, userController.getUserData)

module.exports = router;