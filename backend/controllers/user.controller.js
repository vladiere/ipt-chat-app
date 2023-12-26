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

const getMessages = async(req, res) => {
  try {
    const { uuid } = req.body;
    const result = await userService.getMessages(uuid);

    return result;
  } catch (error) {
    console.error('Getting user messages error at controller: ', error);
    return res.status(500).json(error);
  }
}

const getUserToUserMessages = async (req, res) => {
  try {
    const { uuid_to, uuid_from } = req.body;
    const result = await userService.getUserToUserMessages(uuid_to, uuid_from);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getUser,
  getMessages,
  getUserToUserMessages,
}
