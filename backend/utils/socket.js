const { Server } = require('socket.io');
const messageController = require('../controllers/message.controller');

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:9000'
    }
  });

  io.on('connection', (socket) => {
    console.info('User connection socket ID: ', socket.id);

    socket.on('user_connected', () => {
      socket.emit('get_connected', socket.id);
    });

    socket.on('online_user', data => {
      socket.emit('user_online', data);
    })

    socket.on('send_message', data => {
      const result = messageController.sendMessageTo(data);
      const socketId = data.socketId;
      
      io.to(socketId).emit('get_message', result);
    });

    socket.on('send_image', (uuid_to, uuid_from, data) => {
      const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      const result = messageController.sendImageTo(uuid_to, uuid_from, data);

      socket.emit('get_image', result);
    })
  });
}

module.exports = { initializeSocket };
