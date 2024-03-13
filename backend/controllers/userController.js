// controllers/userController.js
import { io } from '../config/socket.js';
import { handleLobbyLeaveAttempt } from './lobbyController.js';
import onlineUsers from '../sharedData/onlineUsers.js';

export function handleUserConnection(socket) {
    let user = {
        name: "Anonymous",
        lobby: null,
        createdAt: new Date(),
        id: socket.id,
    };

    onlineUsers[socket.id] = user;
    io.emit("user-connected", onlineUsers[socket.id]);
    io.emit("global-player-count", Object.keys(onlineUsers).length);
    console.log(Object.keys(onlineUsers).length);
    console.log(`User connected: ${socket.id}`);
    console.log(onlineUsers);
}

export function handleUserDisconnection(socket) {
    // If the user was in a lobby, remove them from the lobby
    if (onlineUsers[socket.id].lobby) {
        handleLobbyLeaveAttempt(onlineUsers[socket.id].lobby, socket);
    }
    console.log(`User disconnected: ${socket.id}`);
    io.emit("user-disconnected", onlineUsers[socket.id]);
    delete onlineUsers[socket.id];
    io.emit("global-player-count", Object.keys(onlineUsers).length);
}

export function handleSetName(name, socket) {
    onlineUsers[socket.id].name = name;
    console.log("Server side setName: ", onlineUsers[socket.id].name);
    io.emit("user-updated", onlineUsers[socket.id]);
}

export function handleGlobalPlayersRequest(cb) {
    console.log("Server side globalPlayersRequest");
    cb(onlineUsers);
}

export function handleGlobalPlayerCount(cb) {
    console.log("Server side globalPlayerCount");
    cb(Object.keys(onlineUsers).length);
}