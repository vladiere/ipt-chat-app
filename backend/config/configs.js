require('dotenv').config();

const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_REFRESH_SECRET_KEY = process.env.TOKEN_REFRESH_SECRET_KEY;

const TOKEN = {
    expireTime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    accessSecret: TOKEN_SECRET_KEY,
    refreshSecret: TOKEN_REFRESH_SECRET_KEY,
};

const config = {
    token: TOKEN,
};

module.exports = config;
