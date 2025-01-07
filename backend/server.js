import express from 'express';
import http from 'http';
import { io } from './config/socket.js';
import { GameController } from './controllers/GameController';
import { LobbyController } from './controllers/LobbyController';
import { UserController } from './controllers/UserController';
import { errorHandler } from './utils/errorHandler.js';
import { ErrorTypes } from './utils/constants.js';
import { SocketEvents } from './events/events.js';

const app = express();
const httpServer = http.createServer(app);

io.attach(httpServer);

io.on('connection', (socket) => {
	// Now the socket represents a connection to a specific client
	userController.handleUserConnection(socket);

	// USER CONTROLLER EVENTS
	socket.on(SocketEvents.User.CreateUser, (name) => {
		try {
			userController.handleSetName(name, socket);
		} catch (error) {
			errorHandler(socket, 'SET_NAME_ERROR', error.message);
		}
	});

	// socket.on('disconnect', () => {
	// 	try {
	// 		gameController.handlePlayerDisconnect(socket);
	// 		userController.handleUserDisconnection(socket);
	// 	} catch (error) {
	// 		errorHandler(socket, ErrorTypes.USER_DISCONNECTION, error.message);
	// 	}
	// });

	socket.on(SocketEvents.User.ListAllUsers, () => {
		try {
			UserController.listUsers();
		} catch (error) {
			errorHandler(socket, 'PLAYERS_REQUEST_ERROR', error.message);
		}
	});

	// LOBBY CONTROLLER EVENTS
	socket.on(SocketEvents.Lobby.CreateLobby, (lobbyData) => {
		try {
			LobbyController.createLobby(lobbyData, socket);
		} catch (error) {
			errorHandler(socket, 'CREATE_LOBBY_ERROR', error.message);
		}
	});

	socket.on(SocketEvents.Lobby.ListAllLobbies, () => {
		try {
			LobbyController.listLobbies();
		} catch (error) {
			errorHandler(socket, 'LIST_LOBBIES_ERROR', error.message);
		}
	});

	socket.on(SocketEvents.Lobby.UserJoined, (lobbyId, password) => {
		try {
			LobbyController.joinLobby(lobbyId, socket, password);
		} catch (error) {
			errorHandler(socket, 'JOIN_LOBBY_ERROR', error.message);
		}
	});

	socket.on(SocketEvents.Lobby.LeaveLobby, (lobbyId) => {
		try {
			lobbyController.handleLobbyLeaveAttempt(lobbyId, socket);
		} catch (error) {
			errorHandler(socket, 'LEAVE_LOBBY_ERROR', error.message);
		}
	});

	// GAME CONTROLLER EVENTS
	socket.on(SocketEvents.Game.StartGame, (lobbyId) => {
		try {
			GameController.startGame(lobbyId, socket);
		} catch (error) {
			errorHandler(socket, ErrorTypes.START_GAME, error.message);
		}
	});

	socket.on(SocketEvents.Game.EndGame, (lobbyId) => {
		try {
			GameController.endGame(lobbyId, socket);
		} catch (error) {
			errorHandler(socket, ErrorTypes.END_GAME, error.message);
		}
	});

	// socket.on('lobby-players-request', (lobbyId, cb) => {
	// 	try {
	// 		lobbyController.handleLobbyPlayersRequest(lobbyId, cb);
	// 	} catch (error) {
	// 		errorHandler(socket, 'LOBBY_PLAYERS_REQUEST_ERROR', error.message);
	// 	}
	// });

	// socket.on('check-lobby-password', (lobbyId, callback) => {
	// 	try {
	// 		lobbyController.checkLobbyPassword(lobbyId, callback);
	// 	} catch (error) {
	// 		errorHandler(socket, 'CHECK_PASSWORD_ERROR', error.message);
	// 	}
	// });

	// socket.on('player-ready', (lobbyId) => {
	// 	try {
	// 		gameController.playerReady(lobbyId, socket);
	// 	} catch (error) {
	// 		errorHandler(socket, ErrorTypes.PLAYER_READY, error.message);
	// 	}
	// });

	// socket.on('submit-sentence', ({ lobbyId, sentence }) => {
	// 	try {
	// 		gameController.submitSentence(lobbyId, socket, sentence);
	// 	} catch (error) {
	// 		errorHandler(socket, ErrorTypes.SUBMIT_SENTENCE, error.message);
	// 	}
	// });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception: ', error);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at: ', promise, 'reason: ', reason);
	process.exit(1);
});