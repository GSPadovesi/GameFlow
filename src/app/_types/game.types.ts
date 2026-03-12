export type GamePlatform = {
  id: number;
  name: string;
  slug: string;
};

export type GameGenre = {
  id: number;
  name: string;
  slug: string;
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  backgroundImage: string | null;
  rating: number | null;
  ratingTop: number | null;
  platforms: GamePlatform[];
  genres?: GameGenre[];
};
