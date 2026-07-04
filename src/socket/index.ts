import { Server } from "socket.io";

import { registerChatSocket } from "./chat.socket";
import { registerNotificationSocket } from "./notification.socket";
import { registerRoomSocket } from "./room.socket";

export const registerSocketEvents = (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`✅ Connected : ${socket.id}`);

        registerChatSocket(io, socket);
        registerNotificationSocket(io, socket);
        registerRoomSocket(io, socket);

        socket.on("disconnect", () => {
            console.log(`❌ Disconnected : ${socket.id}`);
        });
    });
};