const socketIo = require('socket.io');

const initializeWebSocket = (server) => {

    const io = socketIo(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.info('A user connected Socket ID: ', socket.id);

        socket.on('disconnect', (reason) => {
            console.info('A user disconnected: ', reason);
        });

        socket.on('sendMessage', (data) => {
            io.emit('message', data);
        })
    });
    
}

module.exports = { initializeWebSocket };