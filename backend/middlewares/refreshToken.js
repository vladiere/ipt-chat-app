const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const RefreshToken = require('../models/refreshtoken');

const refreshUserTokens = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        logger.warn("Unauthorized: No Token Provided");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const query = await RefreshToken.findOne({ where: { refresh: refreshToken }});

    
    if (query === null) {
        return res.status(404).json({
            message: 'Refresh token is not valid'
        });
    }


    jwt.verify(refreshToken, config.token.refreshSecret, (err, decoded) => {
        
        err && logger.error(err.message);

        req.body.user = decoded; // Attach user data to the request for later use
        
            // Create the access token
            jwt.sign(
                { email: decoded.email, uuid: decoded.uuid },
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
                            { email: decoded.email, uuid: decoded.uuid },
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
                                    await RefreshToken.create({ decoded.uuid, refreshToken });
                                    
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
