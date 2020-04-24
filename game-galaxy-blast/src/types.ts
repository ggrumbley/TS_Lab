
export interface Player {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
  team: string;
}

export interface Movement {
  x: number;
  y: number;
  rotation: number;
}

export interface Star {
  x: number;
  y: number;
}

export interface Scores {
  blue: number;
  red: number;
}

export interface GameState {
  players: {
    [key: string]: Player,
  },
  star: Star,
  scores: Scores,
}
