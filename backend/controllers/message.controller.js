const messageService = require('../services/message.service');

const sendMessageTo = async (data) => {
  try {
    const result = messageService.sendMessageTo({ uuid_to: data.uuid_to, uuid_from: data.uuid_from, message: data.message });

    if (result) {
      return data;
    }

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

const sendImageTo = async (uuid_to, uuid_from, image) => {
  try {
    const result = messageService.sendImageTo(uuid_to, uuid_from, image);
    if (result) {
      return {
        uuid_to,
        uuid_from,
        image
      };
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
