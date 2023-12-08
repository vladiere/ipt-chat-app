const { Router } = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.post('/user/get', verifyToken, userController.getUser);

module.exports = router;
