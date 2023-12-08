const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', verifyToken, authController.logout);

module.exports = router;
