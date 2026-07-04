import { Server, Socket } from "socket.io";

export const registerChatSocket = (
    io: Server,
    socket: Socket
) => {

    socket.on("private-message", (data) => {

        console.log("Private Message", data);

        io.to(data.receiverSocketId).emit("private-message", data);

    });

};