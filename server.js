// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let currentTurn = 0;
let lastTurns = [];
let turnsServedToday = 0;

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send initial data to the client
  socket.emit('update', { currentTurn, lastTurns, turnsServedToday });

  socket.on('nextTurn', () => {
    turnsServedToday++;
    lastTurns.unshift(currentTurn);
    if (lastTurns.length > 3) lastTurns.pop();
    currentTurn++;
    io.emit('update', { currentTurn, lastTurns, turnsServedToday });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
