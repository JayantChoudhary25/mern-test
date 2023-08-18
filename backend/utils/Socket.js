const socketIO = require("socket.io");

let io; // Global variable to store Socket.IO instance
const adminSocketIds = {}; // Store admin socket IDs

// Initialize Socket.IO and export the server instance
exports.init = (server) => {
  io = socketIO(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("A user connected..");

    socket.on("event", (data) => {
      console.log("Received event:", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    socket.on("selectproduct", (data) => {
      console.log("Selected Product data:",data);
      console.log("Selected Product data.data:",data.data);
    })
  });
};

exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
