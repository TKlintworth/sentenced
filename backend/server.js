const { instrument } = require("@socket.io/admin-ui");
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io/"],
    methods: ["GET", "POST"]
  }
});

instrument(io, {
  auth: false,
});
//app.get('/', (req, res) => {
//  res.send('<h1>Sentencio</h1>'); // Placeholder for your Svelte app
//});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('create-lobby', (lobbyData) => {
    console.log('Server side createLobby');
    console.log(lobbyData);
  });

  socket.on('list-lobbies', () => {
    console.log('Server side listLobbies');
  });
});



const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
