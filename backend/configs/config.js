require('dotenv').config();

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_REFRESH_SECRET_KEY = process.env.TOKEN_REFRESH_SECRET_KEY;

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const TOKEN = {
    expireTime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    accessSecret: TOKEN_SECRET_KEY,
    refreshSecret: TOKEN_REFRESH_SECRET_KEY
};

const config = {
    mysql: MYSQL,
    token: TOKEN
};

module.exports = config;

