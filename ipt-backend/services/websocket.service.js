const { Server } = require('socket.io');


const initializeWebSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    let users = [];

    io.on('connection', (socket) => {
        console.info('A user connected Socket ID: ', socket.id);

        socket.on('user_connected', (data) => {
            
            users.push({...data, socket_id: socket.id})
            socket.join(data.socket_id)
            
            io.emit('user_connected', users);
        })


        socket.on('send_message', (data) => {
            socket.to(data.to).emit('received_message', data);
        })

        socket.on('user_logout', (user_id) => {
            users = users.filter((dataArray) => dataArray.user_id !== user_id)
            console.log('User logged out: ', socket.id)
        })

        socket.on('disconnect', (reason) => {
            users = users.filter((dataArray) => dataArray.socket_id !== socket.id)
            console.info('A user disconnected: ', reason, ' Socket id: ', socket.id);
        });

    });
    
}

module.exports = { initializeWebSocket };