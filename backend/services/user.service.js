const { User, UserMessages } = require('../models');
const { Op } = require('sequelize');

const getUser = async (uuid) => {
  try {
    const result = await User.findOne({ where: { uuid } });

    if (result) {
      return result.getUser();
    }

    return {
      message: 'User not found',
      status: 404
    }
  } catch (error) {
    console.error('\nGetting user details error at service: ', error);
    return error;
  }
}

const getMessages = async(uuid) => {
  try {
    const result = await User.fineOne({ where: { uuid }, include: 'messages' });
    console.log(result);

    return result.getUser();
  } catch (error) {
    console.error('\n\nGetting messages error at service: ', error);
    return error;
  }
}

const getUserToUserMessages = async (uuid_to, uuid_from) => {
  try {
    const result = await UserMessages.findAll({
      attributes: ['uuid', 'uuid_to', 'uuid_from', 'message', 'msg_status', 'createdAt', 'updatedAt'],
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { uuid_to: uuid_to },
              { uuid_from: uuid_from },
            ],
          },
          {
            [Op.and]: [
              { uuid_to: uuid_from },
              { uuid_from: uuid_to },
            ],
          },
        ],
      },
    });

    const fromUser = await User.findOne({ where: { uuid: uuid_to }});

    return {
      fromUser: fromUser.getUser(),
      messages: result,
    };
  } catch (error) {
    console.error('\nGetting user to user messages error at service: ', error);
    return error;
  }
}

module.exports = {
  getUser,
  getMessages,
  getUserToUserMessages,
}
