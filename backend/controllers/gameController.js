// controllers/gameController.js
import { io } from '../config/socket.js';
import onlineUsers from '../sharedData/onlineUsers.js';
import lobbies from '../sharedData/lobbies.js';
import { errorHandler } from '../utils/errorHandler.js';
import { GameState } from '../models/GameState.js';
import { ErrorTypes } from '../utils/constants.js';

const gameStates = {};

export function startGame(lobbyId, socket) {
    try {
        console.log(`Game started in lobby ${lobbyId}`);
        gameStates[lobbyId] = new GameState(lobbyId);

        // Add all the players in the lobby to the game
        Object.values(onlineUsers).forEach(user => {
            if (user.lobby === lobbyId) {
                gameStates[lobbyId].addPlayer(user.id);
            }
        });
        
        gameStates[lobbyId].startGame();
        io.to(lobbyId).emit('game-started', gameStates[lobbyId].getState());

        // Update the lobby status
        lobbies[lobbyId].status = 'playing';
        io.emit('lobby-updated', lobbies[lobbyId]);
    } catch (error) {
        errorHandler(socket, ErrorTypes.START_GAME, error.message);
    }
}

export function playerReady(lobbyId, socket) {
    try {
        if (!gameStates[lobbyId]) {
            throw new Error('Game not found');
        }

        gameStates[lobbyId].playerReady(socket.id);
        console.log(`Player ${socket.id} is ready in lobby ${lobbyId}`);

        io.to(lobbyId).emit('player-ready', socket.id);

        if (gameStates[lobbyId].allPlayersReady()) {
            gameStates[lobbyId].nextRound();
            io.to(lobbyId).emit('all-players-ready', gameStates[lobbyId].getState());
        }
    } catch (error) {
        errorHandler(socket, ErrorTypes.PLAYER_READY, error.message);
    }
}

export function submitSentence(lobbyId, socket, sentence) {
    try {
        if (!gameStates[lobbyId]) {
            throw new Error('Game not found');
        }

        if (gameStates[lobbyId].currentTurn !== socket.id) {
            throw new Error('It is not your turn');
        }

        gameStates[lobbyId].addSentence(sentence);
        gameStates[lobbyId].nextTurn();

        io.to(lobbyId).emit('sentence-submitted', { 
            playerId: socket.id, 
            sentence: sentence,
            gameState: gameStates[lobbyId].getState()
        });
        
    } catch (error) {
        errorHandler(socket, ErrorTypes.SUBMIT_SENTENCE, error.message);
    }
}

export function endGame(lobbyId, socket) {
    try {
        if (!gameStates[lobbyId]) {
            throw new Error('No active game in this lobby');
        }

        gameStates[lobbyId].endGame();
        console.log(`Game ended in lobby ${lobbyId}`);

        io.to(lobbyId).emit('game-ended'), gameStates[lobbyId].getState();

        // Update the lobby status
        lobbies[lobbyId].status = 'waiting';
        io.emit('lobby-updated', lobbies[lobbyId]);

        // Clean up the game state
        delete gameStates[lobbyId];
    } catch (error) {
        errorHandler(socket, ErrorTypes.END_GAME, error.message);
    }
}

export function handlePlayerDisconnect(socket) {
    try {
        const lobbyId = onlineUsers[socket.id]?.lobby;
        if (lobbyId && gameStates[lobbyId]) {
            gameStates[lobbyId].removePlayer(socket.id);
            
            if (gameStates[lobbyId].players.length < 2) {
                endGame(lobbyId, socket);
            } else {
                io.to(lobbyId).emit('player-left-game', {
                    playerId: socket.id,
                    gameState: gameStates[lobbyId].getState()
                });
            }
        }
    } catch (error) {
        console.error('Error handling player disconnect:', error);
    }
}