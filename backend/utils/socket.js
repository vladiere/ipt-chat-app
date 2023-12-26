const { Server } = require('socket.io');
const messageController = require('../controllers/message.controller');
const userService = require('../services/user.service');

let users = [];

const socketIdToUpdate = (uuid, newSocketId) => {
  const foundUser = users.find(user => user.uuid === uuid);

  if (foundUser) {
    foundUser.socketId = newSocketId;
    console.log('Socket id updated: ', newSocketId)
  }

  return users;
}

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on('connection', (socket) => {
    console.info('User connection socket ID: ', socket.id);

    socket.on('user_connected', (uuid) => {
      console.log('User connected: ', socket.id);
      socketIdToUpdate(uuid, socket.id);
      socket.emit('get_connected');
      io.emit('users_connected', users);
    });

    socket.on('online_user', async (uuid) => {
      const userExists = users.find(user => user.uuid === uuid);
      if (!userExists) {
        const result = await userService.getUser(uuid); 

        users.push({
          ...result,
          socketId: socket.id
        });

        io.emit('user_online', users);
      }
    })

    socket.on('send_message', async (data) => {
      const sender = users.find(user => user.uuid === data.uuid_from);
      const receiver = users.find(user => user.uuid === data.uuid_to);
      
      if (receiver) {
        const result = await messageController.sendMessageTo(data.uuid_to,data.uuid_from,data.message);
        io.to(receiver.socketId).to(sender.socketId).emit('get_message', result);
      } else {
        const result = await messageController.sendMessageTo(data.uuid_to,data.uuid_from,data.message);
        io.to(sender.socketId).emit('get_message', result);
      }
    });

    socket.on('send_image', async (uuid_to, uuid_from, data) => {
      const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const result = await messageController.sendImageTo(uuid_to, uuid_from, data);

      socket.emit('get_image', result);
    })

    socket.on('user_logout', (uuid) => {
      users = users.filter(user => user.uuid !== uuid);

      io.emit('user_online', users);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected: ', socket.id);
    });
  });
}

module.exports = { initializeSocket };
