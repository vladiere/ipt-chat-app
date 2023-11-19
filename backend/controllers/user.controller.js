const userService = require('../services/user.service');

const registerUser = async (req, res) => {
    try {
        const userData = req.body.form;

        const result = await userService.register(userData);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const userData = req.body.form;

        const result = await userService.login(userData);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }
}

const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const result = await userService.logout(refreshToken);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

const getUserData = async (req, res) => {
    try {
        const { user_id } = req.body;

        const result = await userService.getUserData(user_id);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    logoutUser
}