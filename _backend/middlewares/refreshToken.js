const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const { Connect, Query } = require('../configs/mysql.config');

const refreshUserTokens = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        logger.warn("Unauthorized: No Token Provided");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const query = `SELECT COUNT(*) AS found_one FROM refresh_token WHERE refresh_token = '${refreshToken}' LIMIT 1;`;

    const connection = await Connect();
    const resultQuery = await Query(connection, query);
    
    if (resultQuery[0].found_one === 0) {
        return res.status(404).json({
            message: 'Refresh token is not valid'
        })
    }


    jwt.verify(refreshToken, config.token.refreshSecret, (err, decoded) => {
        
        err && logger.error(err.message);

        req.body.user = decoded; // Attach user data to the request for later use
        
            // Create the access token
            jwt.sign(
                { username: decoded.username, user_id: decoded.user_id, privilege: decoded.privilege },
                config.token.accessSecret,
                {
                    issuer: config.token.issuer,
                    algorithm: "HS256",
                    expiresIn: config.token.expireTime,
                },
                (error, accessToken) => {
                    if (error) {
                        console.error(error)
                        return res.status(500).json(error);
                    } else if (accessToken) {
                        // Create the refresh token
                        jwt.sign(
                            { username: decoded.username, user_id: decoded.user_id, privilege: decoded.privilege },
                                config.token.refreshSecret,
                            {
                                issuer: config.token.issuer,
                                algorithm: "HS256",
                            },
                            async (error, refreshToken) => {
                                if (error) {
                                console.error(error)
                                return res.status(500).json(error);
                                } else if (refreshToken) {
                                    // Insert the refresh token into the database
                                    const query = `INSERT INTO refresh_token (refresh_token, username) VALUE('${refreshToken}','${decoded.username}')`
                                    const connection = await Connect();

                                    await Query(connection, query);
                                    
                                    return res.status(201).json({
                                        accessToken,
                                        refreshToken
                                    });
                                }
                            }
                        );
                    }
                }
            );
    });
};

module.exports = refreshUserTokens;