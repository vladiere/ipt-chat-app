import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://192.168.48.193:4545');
// const socket: Socket = io('https://iptchatapp.1.us-1.fl0.io');

export { socket };
