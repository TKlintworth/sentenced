/* const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { on } = require('events');
const { nanoid } = require('nanoid'); */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { on } from 'events';
import { nanoid } from 'nanoid';


const app = express();
const httpServer = http.createServer(app);
let users = [];

let onlineUsers = {};
let lobbies = {};
//Create some fake lobby data to test with
/*
lobbies['abc123'] = {
  id: 'abc123',
  serverName: 'Join my game!',
  hostPlayerName: 'Test Host',
  password: 'password',
  createdAt: new Date(),
  userCount: 4,
  maxUsers: 10,
  status: 'finished',
  messages: [],
};

lobbies['def456'] = {
  id: 'def456',
  serverName: 'bubbys room',
  hostPlayerName: 'Another Test Host',
  password: '',
  createdAt: new Date(),
  userCount: 2,
  maxUsers: 2,
  status: 'playing',
  messages: [],
};

lobbies['ghi789'] = {
  id: 'ghi789',
  serverName: 'pleasure place to please people',
  hostPlayerName: 'Yet Another Test Host',
  createdAt: new Date(),
  userCount: 1,
  maxUsers: 4,
  status: 'waiting for players',
  messages: [],
};
*/


const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io/", "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }
});

instrument(io, {
  auth: false,
  mode: "development",
});

app.get('/', (req, res) => {
  res.send('<h1>Sentencio</h1>'); // Placeholder for your Svelte app
});

io.on('connection', (socket) => {
  // Now the socket represents a connection to a specific client

  // INITIAL CONNECTION LOGIC START
  let user = {
    name: "Anonymous",
    lobby: null,
    createdAt: new Date(),
  };

  onlineUsers[socket.id] = user;
  io.emit("user-connected", onlineUsers[socket.id]);
  io.emit("global-player-count", Object.keys(onlineUsers).length);
  console.log(Object.keys(onlineUsers).length);
  console.log(`User connected: ${socket.id}`);
  console.log(onlineUsers);
  // INITIAL CONNECTION LOGIC END

  // SERVER SIDE SOCKET EVENT LISTENERS
  socket.on('set-name', (name) => {
    onlineUsers[socket.id].name = name;
    console.log("Server side setName: ", onlineUsers[socket.id].name);
    io.emit("user-updated", onlineUsers[socket.id]);
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit("user-disconnected", onlineUsers[socket.id]);
    delete onlineUsers[socket.id];
    io.emit("global-player-count", Object.keys(onlineUsers).length);
  });

  socket.on('create-lobby', (lobbyData) => {
    handleLobbyCreation(lobbyData);
  });

  socket.on('global-player-count', (cb) => {
    console.log('Server side globalPlayerCount');
    console.log(cb);
    cb(Object.keys(onlineUsers).length);
  });

  socket.on('list-lobbies', () => {
    console.log('Server side listLobbies');
    console.log(lobbies);
    io.emit('list-lobbies', lobbies);
  });

  socket.on('join-lobby', (lobbyData, cb) => {
    console.log('Server side joinLobby');
    console.log(lobbyData);
    console.log(cb);
    socket.join(lobbyData.lobbyId);
    //cb(messages[lobbyData.lobbyId]);
  });

});

// status's could be: waiting for players, playing, finished
function handleLobbyCreation(lobbyData) {
  let lobbyId = nanoid(11);
  lobbies[lobbyId] = {
    id: lobbyId,
    serverName: lobbyData.serverName,
    password: lobbyData.password,
    hostPlayerName: lobbyData.hostPlayerName,
    createdAt: new Date(),
    //users: [lobbyData.host],
    userCount: 1,
    maxUsers: lobbyData.maxUsers,
    status: 'waiting',
    messages: [],
  };
  io.emit('lobby-created', lobbyId); //lobbies[lobbyId]);
}

function handleLobbyDeletion(lobbyId) {
  delete lobbies[lobbyId];
  io.emit('lobby-deleted', lobbyId);
}

// Add Game Logic Here


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
