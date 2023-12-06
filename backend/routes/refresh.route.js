const { Router } = require('express');
const refreshToken = require('../middlewares/refreshToken');

const router = Router();

router.post('/auth/refresh', refreshToken.refreshUserTokens);

module.exports = router;
