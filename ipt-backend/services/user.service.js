const { Connect, Query } = require('../configs/mysql.config');
const bcryptjs = require('bcryptjs');
const signedJWT = require('../utils/signedJWT');

const register = async (user_data) => {
    try {
        const hash = await bcryptjs.hash(user_data.password, 10);

        let query = `INSERT INTO user_table (firstname,lastname,username,password) VALUES ('${user_data.firstname}','${user_data.lastname}','${user_data.username}', '${hash}');`;

        const connection = await Connect();
        const result = await Query(connection, query);
        
        return result;
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return { error: 'Username already registered'}
        } else {
            return { error: error.message };
        }
    }
}

const login = async (user_data) => {
    try {
        let query = `SELECT * FROM user_table WHERE username = '${user_data.username}';`;

        const connection = await Connect();
        const user = await Query(connection, query);

        if (user.status === '404') {
            return { message: 'Username not registered'};
        }

        const result = await new Promise((resolve, reject) => {
            bcryptjs.compare(user_data.password, user[0].password, (error, result) => {
                if (error) {
                    reject({
                        message: error.message
                    });
                } else if (result) {
                    signedJWT(user, (_error, accessToken, refreshToken) => {
                        if (_error) {
                            reject({
                                message: error.message
                            });
                        } else if (accessToken && refreshToken) {
                            resolve({
                                accessToken,
                                refreshToken
                            });
                        }
                    });
                } else {
                    reject({
                        message: 'Login failed wrong password',
                        statud: 500
                    });
                }

            });
        });

        return result;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

const logout = async (refreshToken) => {
    try {
        const query = `DELETE FROM refresh_token WHERE refresh_token = '${refreshToken}'`;
        const connection = await Connect();
        const result = await Query(connection, query);

        if (result.affectedRows === 1) {
            return { message: 'Logout Successfully', status_code: 200 }
          } else {
            return result;
          };
    } catch (error) {
        console.error(error.message)
        return error;
    }    
}

const getUserData = async (user_id) => {
    try {
        let query = `SELECT * FROM user_table WHERE user_id = ${user_id};`

        const connection = await Connect();
        const result = await Query(connection, query);
        
        return {
            fullname: result[0].lastname + ' ' + result[0].firstname,
            username: result[0].username
        };
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    }
}


module.exports = { login, register, logout, getUserData };