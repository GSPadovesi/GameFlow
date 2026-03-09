import type { GameListItem } from '../GameList/GameList.types';

export type GameCardProps = {
  item: GameListItem;
  className?: string;
  onClick?: (item: GameListItem) => void;
};
