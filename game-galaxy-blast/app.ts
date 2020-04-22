import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

import { createPlayer, Player } from './utils';

const app = express();
const server = new Server(app);
const io = Socket.listen(server);

const port = 3000;

const players: { [key: string]: Player } = {};

const star = {
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50,
};

const scores = {
  blue: 0,
  red: 0,
};
app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  players[socket.id] = createPlayer(socket.id);

  // send the players object to the new player
  socket.emit('currentPlayers', players);

  // send the star object to the new player
  socket.emit('starLocation', star);

  // send the current scores
  socket.emit('scoreUpdate', scores);

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

  socket.on('starCollected', () => {
    if (players[socket.id].team === 'red') {
      scores.red += 10;
    } else {
      scores.blue += 10;
    }
    star.x = Math.floor(Math.random() * 700) + 50;
    star.y = Math.floor(Math.random() * 500) + 50;
    io.emit('starLocation', star);
    io.emit('scoreUpdate', scores);
  });
});

server.listen(port, () => {
  console.log('🚀 Listening On =========== 🚀');
  console.log(`🚀 http://localhost:${port} 🚀`);
});
