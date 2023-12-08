const authService = require('../services/auth.service');

const  register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const result = await authService.register(firstname,lastname,email,password);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email,password);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  register,
  login,
  logout,
}
