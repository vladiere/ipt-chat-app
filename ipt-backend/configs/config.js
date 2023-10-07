const MYSQL_HOST = 'localhost';
const MYSQL_USER = 'root';
const MYSQL_PASS = '31N$t31n';
const MYSQL_DATABASE = 'iptchatapp';

const TOKEN_EXPIRETIME = '15m';
const TOKEN_ISSUER = 'ISC';
const TOKEN_SECRET_KEY = 'thisisnothingbutsecret';
const TOKEN_REFRESH_SECRET_KEY = 'youcannothide';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
}

const TOKEN = {
    expireTime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    accessSecret: TOKEN_SECRET_KEY,
    refreshSecret: TOKEN_REFRESH_SECRET_KEY
}

const config = {
    mysql: MYSQL,
    token: TOKEN
}

module.exports = config;