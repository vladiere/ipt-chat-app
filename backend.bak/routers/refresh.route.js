const {  Router } = require('express');
const refreshToken = require('../middlewares/refreshToken');

const router = Router();

router.post('/refresh/token', refreshToken);

module.exports = router;