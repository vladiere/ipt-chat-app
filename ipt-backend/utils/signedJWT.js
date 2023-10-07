const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const { Connect, Query } = require('../configs/mysql.config');

const signedJWT = (user, callback) => {

    try {
        jwt.sign(
            { username: user[0].username, user_id: user[0].user_id, fullname: user[0].lastname + ' ' + user[0].firstname },
            config.token.accessSecret,
            {
              issuer: config.token.issuer,
              algorithm: "HS256",
              expiresIn: config.token.expireTime,
            },
            (error, accessToken) => {
              if (error) {
                callback(error, null, null);
              } else if (accessToken) {
                // Create the refresh token
                jwt.sign(
                  { username: user[0].username, user_id: user[0].user_id, fullname: user[0].lastname + ' ' + user[0].firstname },
                  config.token.refreshSecret,
                  {
                    issuer: config.token.issuer,
                    algorithm: "HS256",
                  },
                  async (error, refreshToken) => {
                    if (error) {
                      callback(error, null, null);
                    } else if (refreshToken) {
                      // Insert the refresh token into the database
                      const connection = await Connect();
                      await Query(connection, `INSERT INTO refresh_token (username, refresh_token) VALUES('${user[0].username}','${refreshToken}')`)
                      callback(null, accessToken, refreshToken);
                    }
                  }
                );
              }
            }
          );
    } catch (error) {
        console.error('Signing JWT Error: ',error.message, error);
        callback(error, null);
    }
};

module.exports = signedJWT;