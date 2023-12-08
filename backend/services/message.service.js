const { UserMessages, MessageImage } = require('../models');

const sendMessageTo = async (uuid_to, uuid_from, message) => {
  try {
    const result = UserMessages.create({ uuid_to, uuid_from, message });

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

module.exports = {
  sendMessageTo,
  sendImageTo,
}
