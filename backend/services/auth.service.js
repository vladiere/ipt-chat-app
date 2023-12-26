const { RefreshToken, User } = require('../models');
const bcrypt = require('bcryptjs');
const signJWT = require('../utils/signJWT');

const register = async (firstname, lastname, email, password ) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await User.create({ firstname, lastname, email, password: hash });

    if (result) {
      return {
        message: 'Registered successfully',
        status: 201
      }
    } else {
      resurn
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

const login = async (email, password) => {
    try {
        const _result = await User.findOne({ where: { email } });
    
        if (_result === null) {
            return {
                message: 'Email incorrect or not registered',
                status: 409,
            }
        }

        const user = _result.toJSON();

        const result = await new Promise((resolve, reject) => {
        bcrypt.compare(
            password,
            user.password,
            (error, result) => {
            if (error) {
                reject({
                    error
                });
            } else if (result) {
                signJWT(user,async (_error, accessToken, refreshToken) => {
                    if (_error) {
                        reject({
                            error,
                        });
                    } else if (accessToken && refreshToken) {
                        await User.update({ user_status: 'online' }, { where: { uuid: user.uuid }});
                        resolve({
                            status: 200,
                            accessToken,
                            refreshToken
                        });
                    }
                })
            } else {
                reject({
                    message: 'Login failed password incorrect',
                    status: 409
                });
            }
        })
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

const logout = async (refreshToken) => {
  try {
    const result = await RefreshToken.findOne({
      where: { refresh: refreshToken }
    });

    if (result) {
      await result.destroy();

      return {
        message: 'Logout Successfully',
        status: 200
      }
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  register,
  login,
}
