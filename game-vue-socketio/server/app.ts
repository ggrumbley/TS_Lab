import Express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

const app = new Server(Express);
const io = Socket(app);

let position = {
  x: 200,
  y: 200,
};

io.on('connection', (socket) => {
  socket.emit('position', position);
  socket.on('move', (data) => {
    switch (data) {
      case 'left':
        position.x -= 5;
        break;
      case 'right':
        position.x += 5;
        break;
      case 'up':
        position.y -= 5;
        break;
      case 'down':
        position.y += 5;
        break;
    }

    io.emit('position', position);
  });
});

app.listen(3000, () => {
  console.log('🚀 === Listening On ==== 🚀');
  console.log('🚀 http://localhost:3000 🚀');
});
