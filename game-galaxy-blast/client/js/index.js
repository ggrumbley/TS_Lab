const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

const addPlayer = (scene, playerInfo) => {
  scene.ship = scene.physics.add
    .image(playerInfo.x, playerInfo.y, 'ship')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(53, 40);

  if (playerInfo.team === 'blue') {
    scene.ship.setTint(0x0000ff);
  } else {
    scene.ship.setTint(0xff0000);
  }

  scene.ship.setDrag(100);
  scene.ship.setAngularDrag(100);
  scene.ship.setMaxVelocity(200);
};

const addOtherPlayers = (scene, playerInfo) => {
  const otherPlayer = scene.add
    .sprite(playerInfo.x, playerInfo.y, 'otherPlayer')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(53, 40);

  if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x0000ff);
  } else {
    otherPlayer.setTint(0xff0000);
  }

  otherPlayer.playerId = playerInfo.playerId;
  scene.otherPlayers.add(otherPlayer);
};

const moveOtherPlayers = (scene, playerInfo) => {
  scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
    if (playerInfo.playerId === otherPlayer.playerId) {
      otherPlayer.setRotation(playerInfo.rotation);
      otherPlayer.setPosition(playerInfo.x, playerInfo.y);
    }
  });
};

function preload() {
  this.load.image('ship', 'assets/spaceShip.png');
  this.load.image('otherPlayer', 'assets/enemyBlack5.png');
  this.load;
}

function create() {
  const scene = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group();

  this.socket.on('currentPlayers', (players) => {
    Object.keys(players).forEach((id) => {
      if (players[id].playerId === scene.socket.id) {
        addPlayer(scene, players[id]);
      } else {
        addOtherPlayers(scene, players[id]);
      }
    });
  });

  this.socket.on('newPlayer', (playerInfo) => {
    addOtherPlayers(scene, playerInfo);
  });

  this.socket.on('playerMoved', (playerInfo) => {
    moveOtherPlayers(scene, playerInfo);
  });

  this.socket.on('disconnect', (playerId) => {
    scene.otherPlayers.getChildren().forEach((otherPlayer) => {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });

  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.ship) {
    const x = this.ship.x;
    const y = this.ship.y;
    const r = this.ship.rotation;

    if (this.cursors.left.isDown) {
      this.ship.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.ship.setAngularVelocity(150);
    } else {
      this.ship.setAngularVelocity(0);
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
    } else {
      this.ship.setAcceleration(0);
    }

    this.physics.world.wrap(this.ship, 5);

    if (
      this.ship.oldPosition &&
      (x !== this.ship.oldPosition.x ||
        y !== this.ship.oldPosition.y ||
        r !== this.ship.oldPosition.rotation)
    ) {
      this.socket.emit('playerMovement', {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation,
      });
    }

    // save old position data
    this.ship.oldPosition = {
      x: this.ship.x,
      y: this.ship.y,
      rotation: this.ship.rotation,
    };
  }
}
