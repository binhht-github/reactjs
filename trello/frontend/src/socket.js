import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3000";

export const socket = new WebSocket("ws://127.0.0.1:800");
socket.addEventListener("open", (event) => {
  socket.send("Connection established");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
