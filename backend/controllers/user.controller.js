const userService = require('../services/user.service');

const getUser = async(req, res) => {
  try {
    const { uuid } = req.body;
    const result = await userService.getUser(uuid);
    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).json({
      message: 'User not found',
      status: 404
    })
  } catch (error) {
    console.error('Getting user details error at controller: ',error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getUser,
}
