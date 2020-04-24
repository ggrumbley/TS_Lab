import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

import { createPlayer, movePlayer, collectStar } from './handlers';
import * as T from './types';

const app = express();
const server = new Server(app);
const io = Socket.listen(server);

const port = 3000;

const gameState: T.GameState = {
  players: {},
  star: {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
  },
  scores: {
    blue: 0,
    red: 0,
  },
}

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  gameState.players[socket.id] = createPlayer(socket.id);
  // send the players object to the new player
  socket.emit('currentPlayers', gameState.players);
  // send the star object to the new player
  socket.emit('starLocation', gameState.star);
  // send the current scores
  socket.emit('scoreUpdate', gameState.scores);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', gameState.players[socket.id]);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    delete gameState.players[socket.id];
    io.emit('disconnect', socket.id);
  });

  // when a player moves, update the player data
  socket.on('playerMovement', (movementData) => {
    movePlayer(socket, movementData, gameState.players);
  });

  socket.on('starCollected', () => {
    collectStar(socket, gameState);
    io.emit('starLocation', gameState.star);
    io.emit('scoreUpdate', gameState.scores);
  });
});

server.listen(port, () => {
  console.log('🚀 Listening On =========== 🚀');
  console.log(`🚀 http://localhost:${port} 🚀`);
});
