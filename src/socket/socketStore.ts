const onlineUsers = new Map<string, string>();

export const addUser = (
    userId: string,
    socketId: string
) => {
    onlineUsers.set(userId, socketId);
};

export const removeUser = (socketId: string) => {
    for (const [userId, id] of onlineUsers.entries()) {
        if (id === socketId) {
            onlineUsers.delete(userId);
            break;
        }
    }
};

export const getSocketId = (userId: string) => {
    return onlineUsers.get(userId);
};

export const getOnlineUsers = () => {
    return onlineUsers;
};