import { readable, writable } from "svelte/store";
import { io } from "socket.io-client";

const createSocketConnection = () => {
    const { subscribe, set } = writable(null); // Initial value is null
  
    const connect = () => {
      const socket = io('http://localhost:3000'); // Your server URL
  
      set(socket); // Store the socket instance
    };
  
    return {
      subscribe,
      connect,
    };
  };
  
  export const socketStore = createSocketConnection();