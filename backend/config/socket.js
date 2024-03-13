// config/socket.js
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const io = new Server({
  cors: {
    origin: ["https://admin.socket.io/", "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

export { io };