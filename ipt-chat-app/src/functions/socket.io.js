// import { boot } from "quasar";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8080");

export { socket };
