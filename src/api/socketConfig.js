import { io } from "socket.io-client";

const socket = io("https://sttacked-backend.onrender.com", {
    autoConnect: false,
    withCredentials: true
});

export { socket };