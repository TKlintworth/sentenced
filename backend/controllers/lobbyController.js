// controllers/lobbyController.js
import { nanoid } from 'nanoid';
import { io } from '../config/socket.js';
import onlineUsers from '../sharedData/onlineUsers.js';
import lobbies from '../sharedData/lobbies.js';
import { errorHandler } from '../utils/errorHandler.js';

export function handleJoinLobbyAttempt(lobbyId, socket, password) {
    try {
        const lobby = lobbies[lobbyId];
    
        if(!lobby){
            throw new Error('Lobby not found');
        }
    
        if (lobby.password && lobby.password !== password) {
            throw new Error('Incorrect password');
        }
    
        if (lobby.userCount >= lobby.maxUsers) {
            throw new Error('Lobby is full');
        }
    
        if (onlineUsers[socket.id].lobby === lobbyId) {
            throw new Error('You are already in this lobby');
        }
    
        socket.join(lobbyId);
        lobbies[lobbyId].userCount++;
        console.log(`User ${socket.id} joined lobby ${lobbyId}`);
        onlineUsers[socket.id].lobby = lobbyId;
        onlineUsers[socket.id].lobbyName = lobbies[lobbyId].serverName;
        io.emit('user-updated', onlineUsers[socket.id]);
        socket.to(lobbyId).emit('user-joined-lobby', onlineUsers[socket.id]);
        // Send a message to the user that they have successfully joined the lobby
        socket.emit('lobby-joined', lobbyId);
        io.emit('lobby-updated', lobbies[lobbyId]);
    } catch (error) {
        errorHandler(socket, 'JOIN_LOBBY_ERROR', error.message);
    }
}


export function handleLobbyLeaveAttempt(lobbyId, socket) {
    try {
        const lobby = lobbies[lobbyId];
    
        if (!lobby) {
            throw new Error('Lobby not found');
        }
    
        if (onlineUsers[socket.id].lobby !== lobbyId) {
            throw new Error('You are not in this lobby');
        }
    
        // If the user is the host, and there are other users in the lobby, assign a new host
        if (lobby.hostPlayerName === onlineUsers[socket.id].name && lobby.userCount > 1) {
            let newHost = Object.values(onlineUsers).find(user => user.lobby === lobbyId && user.id !== socket.id);
            if (newHost) {
                lobbies[lobbyId].hostPlayerName = newHost.name;
                io.to(lobbyId).emit('lobby-updated', lobbies[lobbyId]);
            }
        }
    
        socket.leave(lobbyId);
        console.log(`User ${socket.id} left lobby ${lobbyId}`);
        onlineUsers[socket.id].lobby = null;
        onlineUsers[socket.id].lobbyName = null;
        lobbies[lobbyId].userCount--;
        io.emit('user-updated', onlineUsers[socket.id]);
        socket.to(lobbyId).emit('user-left-lobby', onlineUsers[socket.id]);
        io.emit('lobby-updated', lobbies[lobbyId]);
        
        if (lobbies[lobbyId].userCount === 0) {
            io.emit('lobby-deleted', lobbyId);
            delete lobbies[lobbyId];
            console.log(`Lobby ${lobbyId} deleted`);
        } 
    } catch (error) {
        errorHandler(socket, 'LEAVE_LOBBY_ERROR', error.message);
    }
}

export function handleLobbyCreation(lobbyData, socket) {
    try {
        let lobbyId = nanoid(11);
        lobbies[lobbyId] = {
            id: lobbyId,
            serverName: lobbyData.serverName,
            password: lobbyData.password,
            hostPlayerName: lobbyData.hostPlayerName,
            createdAt: new Date(),
            userCount: 0,
            maxUsers: lobbyData.maxUsers,
            status: 'waiting',
            messages: [],
        };
        socket.emit('lobby-created', lobbyId); //lobbies[lobbyId]);
        io.emit('new-lobby', lobbies[lobbyId]);
    } catch (error) {
        errorHandler(socket, 'CREATE_LOBBY_ERROR', error.message);
    }
}

export function handleLobbyPlayersRequest(lobbyId, cb) {
    try {
        console.log('Server side lobbyPlayersRequest');
        let lobbyPlayers = Object.values(onlineUsers).filter(user => user.lobby === lobbyId);
        cb(lobbyPlayers);
    } catch (error) {
        errorHandler(socket, 'LOBBY_PLAYERS_REQUEST_ERROR', error.message);
    }
}

export function listLobbies() {
    try {
        console.log('Server side listLobbies');
        io.emit('list-lobbies', lobbies);
    } catch (error) {
        errorHandler(socket, 'LIST_LOBBIES_ERROR', error.message);
    }
}

export function checkLobbyPassword(lobbyId, callback) {
    try {
        console.log('Server side checkLobbyPassword');
        const lobby = lobbies[lobbyId];
        if (lobby && lobby.password) {
          callback(true);
        } else {
          callback(false);
        }
    } catch (error) {
        errorHandler(socket, 'CHECK_PASSWORD_ERROR', error.message);
    }
}