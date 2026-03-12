import type { Game } from './game.types';

export type GameStatus = 'wishlist' | 'playing' | 'completed' | 'dropped';

export type UserGame = {
  gameId: number;
  status: GameStatus | null;
  favorite: boolean;
  personalRating?: number | null;
  notes?: string | null;
  startedAt?: string | null;
  finishedAt?: string | null;
};

export type UserGameItem = {
  game: Game;
  userGame?: UserGame | null;
};
