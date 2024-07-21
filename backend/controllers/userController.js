// controllers/userController.js
import { io } from '../config/socket.js';
import { handleLobbyLeaveAttempt } from './lobbyController.js';
import onlineUsers from '../sharedData/onlineUsers.js';
import  { errorHandler } from '../utils/errorHandler.js';
import { ErrorTypes } from '../utils/constants.js';
import { validateUsername } from '../utils/validation.js';

export function handleUserConnection(socket) {
    try {
        let user = {
            name: "Anonymous",
            lobby: null,
            createdAt: new Date(),
            id: socket.id,
        };
    
        onlineUsers[socket.id] = user;
        io.emit("user-connected", onlineUsers[socket.id]);
        io.emit("global-player-count", Object.keys(onlineUsers).length);
        console.log(`User connected: ${socket.id}`);
    } catch (error) {
        errorHandler(socket, ErrorTypes.USER_CONNECTION, error.message);
    }
}

export function handleUserDisconnection(socket) {
    try {
        if (onlineUsers[socket.id].lobby && onlineUsers[socket.id].lobby) {
            handleLobbyLeaveAttempt(onlineUsers[socket.id].lobby, socket);
        }
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", onlineUsers[socket.id]);
        delete onlineUsers[socket.id];
        io.emit("global-player-count", Object.keys(onlineUsers).length);
    } catch (error) {
        errorHandler(socket, ErrorTypes.USER_DISCONNECTION, error.message);
    }
}

export function handleSetName(name, socket) {
    try {
        validateUsername(name);
        onlineUsers[socket.id].name = name;
        console.log("Server side setName: ", onlineUsers[socket.id].name);
        io.emit("user-updated", onlineUsers[socket.id]);
    } catch (error) {
        errorHandler(socket, ErrorTypes.SET_NAME, error.message);
    }
}

export function handleGlobalPlayersRequest(cb) {
    try {
        console.log("Server side globalPlayersRequest");
        cb(onlineUsers);
    } catch (error) {
        errorHandler(socket, ErrorTypes.GLOBAL_PLAYERS_REQUEST, error.message);
    }
}

export function handleGlobalPlayerCount(cb) {
    try {
        console.log("Server side globalPlayerCount");
        cb(Object.keys(onlineUsers).length);
    } catch (error) {
        errorHandler(socket, ErrorTypes.GLOBAL_PLAYER_COUNT, error.message);
    }
}