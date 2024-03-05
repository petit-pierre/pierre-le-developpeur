import React from "react";
import io from "socket.io-client";

export const socket = io.connect("http://localhost:3000");
export const SocketContext = React.createContext();
//export const socket = io("http://localhost:3000");
