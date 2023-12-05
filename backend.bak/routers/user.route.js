const { Router } = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', verifyToken, userController.logoutUser);
router.post('/get/all', verifyToken, userController.getUserData)

module.exports = router;