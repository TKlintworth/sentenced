export const errorHandler = (socket, errorType, errorMessage) => {
    console.error(`${errorType}: ${errorMessage}`);
    socket.emit("error", { type: errorType, message: errorMessage });
};