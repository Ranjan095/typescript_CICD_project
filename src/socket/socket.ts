import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initializeSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized");
    }

    return io;
};