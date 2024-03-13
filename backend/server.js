import express from 'express';
import http from 'http';
import { io } from './config/socket.js';
import * as userController from './controllers/userController.js';
import * as lobbyController from './controllers/lobbyController.js';

const app = express();
const httpServer = http.createServer(app);

io.attach(httpServer);

io.on('connection', (socket) => {
  // Now the socket represents a connection to a specific client
  userController.handleUserConnection(socket);

  // USERCONTROLLER EVENTS
  socket.on('set-name', (name) => {
    userController.handleSetName(name, socket);
  });
  
  socket.on('disconnect', () => {
    userController.handleUserDisconnection(socket);
  });

  socket.on('global-player-count', (cb) => {
    userController.handleGlobalPlayerCount(cb);
  });

  socket.on('global-players-request', (cb) => {
    userController.handleGlobalPlayersRequest(cb);
  });

  // LOBBYCONTROLLER EVENTS
  socket.on('create-lobby', (lobbyData) => {
    lobbyController.handleLobbyCreation(lobbyData, socket);
  });

  socket.on('list-lobbies', () => {
    lobbyController.listLobbies();
  });

  socket.on('join-lobby', (lobbyId, password) => {
    lobbyController.handleJoinLobbyAttempt(lobbyId, socket, password);
  });

  socket.on('leave-lobby', (lobbyId) => {
    lobbyController.handleLobbyLeaveAttempt(lobbyId, socket);
  });

  socket.on('lobby-players-request', (lobbyId, cb) => {
    lobbyController.handleLobbyPlayersRequest(lobbyId, cb);
  });

  socket.on('check-lobby-password', (lobbyId, callback) => {
    lobbyController.checkLobbyPassword(lobbyId, callback);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
