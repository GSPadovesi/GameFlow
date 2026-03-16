import type { GameStatus, UserGameItem } from '@/app/_types/user-game.types';

export type GameListState = {
  loading: boolean;
  error: boolean | null;
};

export type GameListActions = {
  onGameClick?: (item: UserGameItem) => void;
  onStatusChange?: (item: UserGameItem, status: GameStatus) => void;
  onFavoriteToggle?: (item: UserGameItem) => void;
};

export type GameListGenre =
  | 'action'
  | 'shooter'
  | 'adventure'
  | 'rpg'
  | 'indie'
  | 'strategy'
  | 'casual'
  | 'simulation'
  | 'puzzle'
  | 'arcade'
  | 'platformer'
  | 'racing'
  | 'sports'
  | 'fighting'
  ;

export type GameListPlataform =
  | "playstation5"
  | "playstation4"
  | "playstation3"
  | "xbox-series-x"
  | "xbox-one"
  | "xbox360"
  | "nintendo-switch"
  | "nintendo-3ds"
  | "wii-u"
  | "nes"
  | "pc"
  | "linux"
  | "macos"
  | "web"
  | "android"
  | "ps-vita"
  ;

export type GameListFilters = {
  search: string;
  platform: GameListPlataform | null;
  genre: GameListGenre | null;
};

export type GameListFilterProps = {
  value: GameListFilters;
  onChange: (filters: GameListFilters) => void;
};

export type GameListPagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type GameListOptions = {
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  showFavoriteAction?: boolean;
  showStatusActions?: boolean;
  clickableCard?: boolean;
};

export type GameListProps = {
  items: UserGameItem[];
  className?: string;
  state?: GameListState;
  actions?: GameListActions;
  filters: GameListFilterProps;
  pagination: GameListPagination;
  options?: GameListOptions;
};
