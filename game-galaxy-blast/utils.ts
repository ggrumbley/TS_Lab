export interface Player {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
  team: string;
}

export const createPlayer = (playerId: string): Player => ({
  rotation: 0,
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50,
  playerId,
  team: Math.floor(Math.random() * 2) == 0 ? 'red' : 'blue',
});
