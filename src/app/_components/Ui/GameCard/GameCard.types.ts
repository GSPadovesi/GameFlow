import type { UserGameItem } from '@/app/_types/user-game.types';

export type GameCardProps = {
  item: UserGameItem;
  className?: string;
  onClick?: (item: UserGameItem) => void;
};
