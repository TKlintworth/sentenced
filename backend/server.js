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
    id: socket.id,
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
    // If the user was in a lobby, remove them from the lobby
    if (onlineUsers[socket.id].lobby) {
      handleLobbyLeaveAttempt(onlineUsers[socket.id].lobby, socket);
    }
    console.log(`User disconnected: ${socket.id}`);
    io.emit("user-disconnected", onlineUsers[socket.id]);
    delete onlineUsers[socket.id];
    io.emit("global-player-count", Object.keys(onlineUsers).length);
  });

  socket.on('create-lobby', (lobbyData) => {
    handleLobbyCreation(lobbyData, socket);
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

  socket.on('join-lobby', (lobbyId, password) => {
    handleJoinLobbyAttempt(lobbyId, socket, password);
  });

  socket.on('leave-lobby', (lobbyId) => {
    console.log('Received leave-lobby event with lobbyId:', lobbyId);
    handleLobbyLeaveAttempt(lobbyId, socket);
  });

  socket.on('global-players-request', (cb) => {
    console.log('Server side globalPlayersRequest');
    cb(onlineUsers);
  });

  socket.on('lobby-players-request', (lobbyId, cb) => {
    console.log('Server side lobbyPlayersRequest');
    let lobbyPlayers = [];
    for (let user in onlineUsers) {
      if (onlineUsers[user].lobby === lobbyId) {
        lobbyPlayers.push(onlineUsers[user]);
      }
    }
    cb(lobbyPlayers);
  });

  socket.on('check-lobby-password', (lobbyId, callback) => {
    console.log('Server side checkLobbyPassword');
    const lobby = lobbies[lobbyId];
    if (lobby && lobby.password) {
      callback(true);
    } else {
      callback(false);
    }
  });

});

// status's could be: waiting for players, playing, finished
function handleLobbyCreation(lobbyData, socket) {
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

// If the host of a lobby disconnects, randomly assign a new host
function handleHostDisconnect(lobbyId) {
  //let newHost = lobbies[lobbyId].users[Math.floor(Math.random() * lobbies[lobbyId].users.length)];
  //lobbies[lobbyId].host = newHost;
  io.emit('host-disconnected', ""); //newHost);
}

function handleJoinLobbyAttempt(lobbyId, socket, password) {
  console.log('Server side handleJoinLobbyAttempt');
  let lobbyJoinFailReason = '';

  const lobby = lobbies[lobbyId];
  if (lobby) {
    if (lobby.password && lobby.password !== password) {
      lobbyJoinFailReason = 'Incorrect password';
    } else {
      if (lobby.userCount >= lobby.maxUsers) {
        lobbyJoinFailReason = 'Lobby is full';
      } else {
        if (onlineUsers[socket.id].lobby === lobbyId) {
          lobbyJoinFailReason = 'You are already in this lobby';
        } else {
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
          return;
        }
      }
    }
  } else {
    lobbyJoinFailReason = 'Lobby not found';
  }

  socket.emit('lobby-join-failed', { lobbyId: lobbyId, reason: lobbyJoinFailReason });
}

function handleLobbyLeaveAttempt(lobbyId, socket) {
  console.log('Server side handleLobbyLeaveAttempt');
  console.log('Lobby ID:', lobbyId);
  console.log('User ID:', socket.id);
  console.log('Lobbies:', lobbies);
  
  if (lobbies[lobbyId]) {
    socket.leave(lobbyId);
    console.log(`User ${socket.id} left lobby ${lobbyId}`);
    onlineUsers[socket.id].lobby = null;
    onlineUsers[socket.id].lobbyName = null;
    lobbies[lobbyId].userCount--;
    io.emit('user-updated', onlineUsers[socket.id]);
    socket.to(lobbyId).emit('user-left-lobby', onlineUsers[socket.id]);
    io.emit('lobby-updated', lobbies[lobbyId]);

    if (lobbies[lobbyId].userCount === 0) {
      delete lobbies[lobbyId];
      io.emit('lobby-deleted', lobbyId);
      console.log(`Lobby ${lobbyId} deleted`);
    }
  } else {
    console.log(`Lobby ${lobbyId} not found`);
  }
}

// If there are no users in a lobby, delete it
function handleEmptyLobby(lobbyId) {
  delete lobbies[lobbyId];
  io.emit('lobby-deleted', lobbyId);
}

// Add Game Logic Here


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
