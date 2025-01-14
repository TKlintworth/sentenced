import express, { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import UserController from './controllers/UserController.ts';
import LobbyController from './controllers/LobbyController.ts';
import { GameController } from './controllers/GameController.ts';
import { errorHandler } from './utils/errorHandler.js';
import { ErrorTypes } from './utils/constants.js';
import { SocketEvents } from './events/events.js';
import { CreateUserRequest, CreateLobbyRequest, JoinLobbyRequest, LeaveLobbyRequest } from './models/index.ts';

const app: Express = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: ["https://admin.socket.io/", "http://localhost:5173", "http://localhost:3000"],
		credentials: true,
	}
});

const gameController = new GameController();

// io.attach(httpServer);

io.on('connection', (socket) => {
	// Now the socket represents a connection to a specific client

	// USER CONTROLLER EVENTS
	socket.on(SocketEvents.CREATE_USER, (req: CreateUserRequest) => {
		try {
			UserController.createUser(req);
			
		} catch (error: any) {
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

	socket.on(SocketEvents.LIST_ALL_USERS, () => {
		try {
			UserController.listUsers();
		} catch (error: any) {
			errorHandler(socket, 'PLAYERS_REQUEST_ERROR', error.message);
		}
	});

	// LOBBY CONTROLLER EVENTS
	socket.on(SocketEvents.CREATE_LOBBY, (req: CreateLobbyRequest) => {
		try {
			LobbyController.createLobby(req);
		} catch (error: any) {
			errorHandler(socket, 'CREATE_LOBBY_ERROR', error.message);
		}
	});

	socket.on(SocketEvents.LIST_LOBBIES, () => {
		try {
			LobbyController.listLobbies();
		} catch (error: any) {
			errorHandler(socket, 'LIST_LOBBIES_ERROR', error.message);
		}
	});

	socket.on(SocketEvents.JOIN_LOBBY, (req: JoinLobbyRequest) => {
		try {
			LobbyController.joinLobby(req, socket);
		} catch (error: any) {
			errorHandler(socket, 'JOIN_LOBBY_ERROR', error.message);
		}
	});

	socket.on(SocketEvents.LEAVE_LOBBY, (req: LeaveLobbyRequest) => {
		try {
			LobbyController.leaveLobby(req, socket);
		} catch (error: any) {
			errorHandler(socket, ErrorTypes.LEAVE_LOBBY, error.message);
		}
	});

	// GAME CONTROLLER EVENTS
	//socket.on(SocketEvents.Game.StartGame, (lobbyId) => {
	//	try {
	//		GameController.startGame(lobbyId, socket);
	//	} catch (error) {
	//		errorHandler(socket, ErrorTypes.START_GAME, error.message);
	//	}
	//});

	//socket.on(SocketEvents.Game.EndGame, (lobbyId) => {
	//	try {
	//		GameController.endGame(lobbyId, socket);
	//	} catch (error) {
	//		errorHandler(socket, ErrorTypes.END_GAME, error.message);
	//	}
	//});

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

process.on('uncaughtException', (error: Error) => {
	console.error('Uncaught Exception: ', error);
	process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
	console.error('Unhandled Rejection at: ', promise, 'reason: ', reason);
	process.exit(1);
});