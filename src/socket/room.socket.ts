import { Server, Socket } from "socket.io";

export const registerRoomSocket = (
    io: Server,
    socket: Socket
) => {

    socket.on("join-room", ({ roomId }: { roomId: string }) => {

        socket.join(roomId);

        console.log(`${socket.id} joined ${roomId}`);

    });

    socket.on("leave-room", (roomId: string) => {

        socket.leave(roomId);

        console.log(`${socket.id} left ${roomId}`);

    });

    socket.on("room-message", ({ roomId, message }) => {

        io.to(roomId).emit("room-message", {
            roomId,
            message,
        });

    });

};