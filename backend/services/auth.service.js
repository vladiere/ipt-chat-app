const User = require('../models/user.js');
const bcrypt = require('bcryptjs')
const signJWT = require('../utils/signJWT');

const register = async (firstname, lastname, email, password ) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await User.create({ firstname, lastname, email, hash });

    if (result) {
      return {
        message: 'Registered successfully',
        ...result,
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
    const user = await User.findOne({ where:  { email: email }});

    if (user === null) {
      return {
        message: 'Email incorrect or not registered',
        status: 409,
      }
    }

    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(
        password,
        user.password,
        (error, result) => {
          if (error) {
            reject({
              message: error.message
            });
          } else if (result) {
            signJWT(user,(_error, accessToken, refreshToken) => {
              if (_error) {
                reject({
                  message: error.message,
                });
              } else if (accessToken && refreshToken) {
                resolve({
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
        }
      )
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  register,
  login,
}
