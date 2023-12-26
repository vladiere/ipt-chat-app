const { Router } = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');
const msgController = require('../controllers/message.controller');

const router = Router();

router.post('/user/get', verifyToken, userController.getUser);
router.post('/user/get/messages', verifyToken, userController.getMessages);
router.post('/user/message', verifyToken, userController.getUserToUserMessages);

router.post('/user/get/recent', verifyToken, msgController.getSingleMessagesForEveryRecipients);

module.exports = router;
