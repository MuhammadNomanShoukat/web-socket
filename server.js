const express = require("express");
const cors = require("cors");
const axios = require("axios");
const ws = require("ws");
const path = require("path")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ extended: true }));

// HTTP routes
app.use("/video/generateLink", require("./routes/video/generateLink.js"));
app.use("/user/jwtAuth", require("./routes/user/userAuth.js"));

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, "index.html"))
})

// Create an HTTP server from the express app
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Initialize WebSocket server
const wss = new ws.Server({ server });

// WebSocket connection handling
wss.on("connection", (socket) => {
  console.log("WebSocket connection established");

  // When a message is received from the client
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Example: Echo the message back to the client
    socket.send(`Server received: ${message}`);
  });

  // When the connection is closed
  socket.on("close", () => {
    console.log("WebSocket connection closed");
  });

  // Send an initial message to the client
  socket.send("Welcome to the WebSocket server!");
});
