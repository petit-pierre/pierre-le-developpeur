const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  /*socket.on("join_room", (data) => {
    socket.join(data);
  });*/

  socket.on("send_message", (message) => {
    //socket.to(data.room).emit("receive_message", data);
    socket.broadcast.emit("receive_message", message);
  });
});

server.listen(3002, () => {
  console.log("SERVER IS RUNNING");
});
