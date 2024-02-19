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
    console.log(onlineUsers);
  });

  socket.on('create-lobby', (lobbyData) => {
    console.log('Server side createLobby');
    console.log(lobbyData);
    // Generate a unique ID for the lobby
    lobbyData.lobbyId = nanoid();
    lobbies[lobbyData.lobbyId] = lobbyData;
    console.log(`Lobbies: ${lobbies}`);
  });

  socket.on('list-lobbies', () => {
    console.log('Server side listLobbies');
  });

  socket.on('join-lobby', (lobbyData, cb) => {
    console.log('Server side joinLobby');
    console.log(lobbyData);
    console.log(cb);
    socket.join(lobbyData.lobbyId);
    //cb(messages[lobbyData.lobbyId]);
  });

});






const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
