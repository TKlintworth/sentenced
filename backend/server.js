const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { on } = require('events');

const app = express();
const httpServer = http.createServer(app);

let users = [];

let onlineUsers = {};

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
  // Initially add their user id to the list of online users
  let user = {
    name: "Anonymous",
    lobby: null,
    createdAt: new Date(),
  };

  onlineUsers[socket.id] = user;
  io.emit("user-connected", onlineUsers[socket.id]);

  socket.on('set-name', (name) => {
    onlineUsers[socket.id].name = name;
    io.emit("user-updated", onlineUsers[socket.id]);
  });
  
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit("user-disconnected", onlineUsers[socket.id]);
    delete onlineUsers[socket.id];
  });

  socket.on('create-lobby', (lobbyData) => {
    console.log('Server side createLobby');
    console.log(lobbyData);
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
