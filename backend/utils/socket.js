const { Server } = require('socket.io');

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:9000'
    }
  });

  io.on('connection', () => {
    console.info('User connection socket ID: ', socket.id);

    socket.on('user_connect', () => {
      console.log('Testing...')
    })
  });
}

module.exports = { initializeSocket };
