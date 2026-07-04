import { Server, Socket } from "socket.io";

export const registerNotificationSocket = (
    io: Server,
    socket: Socket
) => {

    socket.on("notification", (data) => {

        console.log("Notification", data);

        io.emit("notification", data);

    });

};