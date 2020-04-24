import * as Socket from 'socket.io';
import * as T from './types';

export const createPlayer = (playerId: string): T.Player => ({
  rotation: 0,
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50,
  playerId,
  team: Math.floor(Math.random() * 2) == 0 ? 'red' : 'blue',
});

export const movePlayer = (socket: Socket.Socket, movementData: T.Movement, players: { [key: string]: T.Player }) => {
  players[socket.id].x = movementData.x;
  players[socket.id].y = movementData.y;
  players[socket.id].rotation = movementData.rotation;
  // emit a message to all players about the player that moved
  socket.broadcast.emit('playerMoved', players[socket.id]);
}

export const collectStar = (socket: Socket.Socket, state: T.GameState) => {
  const { players, scores, star } = state;
  players[socket.id].team === 'red' ? scores.red += 10 : scores.blue += 10;
  star.x = Math.floor(Math.random() * 700) + 50;
  star.y = Math.floor(Math.random() * 500) + 50;
}
