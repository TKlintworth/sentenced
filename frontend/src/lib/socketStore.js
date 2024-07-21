import { readable, writable } from "svelte/store";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

const createSocketConnection = () => {
    const { subscribe, set } = writable(null); // Initial value is null
    let socket;
  
    const connect = () => {
      socket = io(SOCKET_URL, {
        reconnectionAttempts: 5,
        timeout: 10000,
      }); 
      
      socket.on("connect", () => {
        console.log("Connected to server");
        set(socket);
      });

      socket.on("connect_error", (error) => {
        console.error("Connection error", error);
        set(null);
      });

      socket.on("disconnect", (reason) => {
        console.log("Disconnected from server: ", reason);
        set(null);
      });
    };

    const disconnect = () => {
      if (socket) {
        socket.disconnect();
      }
    };
  
    return {
      subscribe,
      connect,
      disconnect
    };
  };
  
  export const socketStore = createSocketConnection();