import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

import { createPlayer, Player } from './utils';

const app = express();
const server = new Server(app);
const io = Socket.listen(server);

const port = 3000;

const players: { [key: string]: Player } = {};

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  players[socket.id] = createPlayer(socket.id);
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    delete players[socket.id];
    io.emit('disconnect', socket.id);
  });

  // when a player moves, update the player data
  socket.on('playerMovement', (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
});

server.listen(port, () => {
  console.log('🚀 === Listening On ==== 🚀');
  console.log(`🚀 http://localhost:${port} 🚀`);
});
