const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const RefreshToken = require('../models/refreshtoken');


const signedJWT = (user, callback) => {
    try {
        jwt.sign(
            { email: user[0].email, uuid: user[0].uuid },
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
                  { email: user[0].email, uuid: user[0].uuid },
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
                      await RefreshToken.create({ user_id: decoded.uuid, refresh: refreshToken });

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
