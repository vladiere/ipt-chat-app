const messageService = require('../services/message.service');

const sendMessageTo = async (uuid_to, uuid_from, message) => {
  try {
    const result = messageService.sendMessageTo(uuid_to, uuid_from, message);

    if (result) {
      return result;
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

const getSingleMessagesForEveryRecipients = async (req, res) => {
    try {
        const { uuid } = req.body;

        const result = await messageService.getSingleMessagesForEveryRecipients(uuid);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    sendMessageTo,
    sendImageTo,
    getSingleMessagesForEveryRecipients,
}
