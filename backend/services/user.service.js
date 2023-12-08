const { User } = require('../models');

const getUser = async (uuid) => {
  try {
    const result = await User.findOne({ where: { uuid } });

    if (result) {
      return result.toJSON();
    }

    return {
      message: 'User not found',
      status: 404
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  getUser,
}
