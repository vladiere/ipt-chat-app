require('dotenv').config();

const PG_HOST = process.env.PGHOST;
const PG_USER = process.env.PGUSER;
const PG_PASSWORD = process.env.PGPASSWORD;
const PG_DATABASE = process.env.PGDATABASE;

const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const TOKEN_REFRESH_SECRET_KEY = process.env.TOKEN_REFRESH_SECRET_KEY;

const POSTGRES = {
    host: PG_HOST,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD,
};

const TOKEN = {
    expireTime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    accessSecret: TOKEN_SECRET_KEY,
    refreshSecret: TOKEN_REFRESH_SECRET_KEY,
};

const config = {
    postgres: POSTGRES,
    token: TOKEN,
};

module.exports = config;


