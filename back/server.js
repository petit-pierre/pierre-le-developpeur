const express = require("express");
const http = require("http");
const app = require("./app");
const { Server } = require(`socket.io`);
const cors = require("cors");

app.use(cors());

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  //console.log(`User Connected: ${socket.id}`);

  /*socket.on("join_room", (data) => {
    socket.join(data);
  });*/

  socket.on("send_message", (data) => {
    //socket.to(data.room).emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
  });
});
