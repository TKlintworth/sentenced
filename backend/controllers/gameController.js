// gamesController.js
import { nanoid } from 'nanoid';
import { io } from '../config/socket.js';
import onlineUsers from '../sharedData/onlineUsers.js';
import lobbies from '../sharedData/lobbies.js';

let readyPlayers = 0;

export function startGame(lobbyId, socket) {
    console.log(`Game started in lobby ${lobbyId}`);
    socket.to(lobbyId).emit('game-started');
}

export function playerReady(lobbyId, socket) {
    console.log(`Player ${socket.id} is ready in lobby ${lobbyId}`);
    socket.to(lobbyId).emit('player-ready', socket.id);
}

function checkAllPlayersReady(lobbyId) {
    if (readyPlayers === lobbies[lobbyId].userCount) {
        io.to(lobbyId).emit('all-players-ready');
        readyPlayers = 0;
    }
}

export function endGame(lobbyId, socket) {
    console.log(`Game ended in lobby ${lobbyId}`);
    socket.to(lobbyId).emit('game-ended');
}