const { UserMessages, MessageImage, sequelize, User } = require('../models');
const { Op } = require('sequelize');

const sendMessageTo = async (uuid_to, uuid_from, message) => {
  try {
    console.log('\n\n')
    const result = await UserMessages.create({ uuid_to, uuid_from, message });

    if (result) {
      return result.toJSON();
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

const sendImageTo = async (uuid_to, uuid_from, image) => {
  try {
    const result = await MessageImage.create({ uuid_to, uuid_from, image })
    if (result) {
      return {
        uuid_to,
        uuid_from,
        message
      }
    }

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

const getSingleMessagesForEveryRecipients = async (uuid_to) => {
    try {
        const result = await UserMessages.findAll({
            attributes: ['uuid', 'message', 'msg_status', 'createdAt'],
            order: [['createdAt', 'DESC']],
            where: { uuid_to },
            include: 'fromUser',
        });

        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);
        return error;
    }
}

module.exports = {
    sendMessageTo,
    sendImageTo,
    getSingleMessagesForEveryRecipients,
}
