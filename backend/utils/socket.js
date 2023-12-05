const { Server } = require('socket.io');

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', () => {
    console.info('User connection socket ID: ', socket.id);
  });
}
