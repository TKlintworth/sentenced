// controllers/lobbyController.js
import { nanoid } from 'nanoid';
import { io } from '../config/socket.js';
import onlineUsers from '../sharedData/onlineUsers.js';
import lobbies from '../sharedData/lobbies.js';

export function handleJoinLobbyAttempt(lobbyId, socket, password) {
    let lobbyJoinFailReason = '';
    const lobby = lobbies[lobbyId];

    if(!lobby){
        lobbyJoinFailReason = 'Lobby not found';
        socket.emit('error-message', { lobbyId: lobbyId, reason: lobbyJoinFailReason });
        return;
    }

    if (lobby.password && lobby.password !== password) {
        lobbyJoinFailReason = 'Incorrect password';
        socket.emit('error-message', { lobbyId: lobbyId, reason: lobbyJoinFailReason });
        return;
    }

    if (lobby.userCount >= lobby.maxUsers) {
        lobbyJoinFailReason = 'Lobby is full';
        socket.emit('error-message', { lobbyId: lobbyId, reason: lobbyJoinFailReason });
        return;
    }

    if (onlineUsers[socket.id].lobby === lobbyId) {
        lobbyJoinFailReason = 'You are already in this lobby';
        socket.emit('error-message', { lobbyId: lobbyId, reason: lobbyJoinFailReason });
        return;
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
}


export function handleLobbyLeaveAttempt(lobbyId, socket) {
    let lobbyLeaveFailReason = '';
    const lobby = lobbies[lobbyId];

    if (!lobby) {
        lobbyLeaveFailReason = 'Lobby not found';
        socket.emit('error-message', { lobbyId: lobbyId, reason: lobbyLeaveFailReason });
        return;
    }

    if (onlineUsers[socket.id].lobby !== lobbyId) {
        lobbyLeaveFailReason = 'You are not in this lobby';
        socket.emit('error-message', { lobbyId: lobbyId, reason: lobbyLeaveFailReason });
        return;
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
}


export function handleLobbyCreation(lobbyData, socket) {
    let lobbyId = nanoid(11);
    lobbies[lobbyId] = {
        id: lobbyId,
        serverName: lobbyData.serverName,
        password: lobbyData.password,
        hostPlayerName: lobbyData.hostPlayerName,
        createdAt: new Date(),
        //users: [lobbyData.host],
        userCount: 0,
      maxUsers: lobbyData.maxUsers,
      status: 'waiting',
      messages: [],
    };
    socket.emit('lobby-created', lobbyId); //lobbies[lobbyId]);
    io.emit('new-lobby', lobbies[lobbyId]);
}

export function handleLobbyPlayersRequest(lobbyId, cb) {
    console.log('Server side lobbyPlayersRequest');
    let lobbyPlayers = [];
    for (let user in onlineUsers) {
        if (onlineUsers[user].lobby === lobbyId) {
            lobbyPlayers.push(onlineUsers[user]);
        }
    }
    cb(lobbyPlayers);
}

export function listLobbies() {
    console.log('Server side listLobbies');
    console.log(lobbies);
    io.emit('list-lobbies', lobbies);
}

export function checkLobbyPassword(lobbyId, callback) {
    console.log('Server side checkLobbyPassword');
    const lobby = lobbies[lobbyId];
    if (lobby && lobby.password) {
      callback(true);
    } else {
      callback(false);
    }
}