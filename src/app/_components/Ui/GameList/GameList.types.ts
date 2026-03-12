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

export type GameListOrdering =
  | 'name'
  | '-name'
  | 'released'
  | '-released'
  | 'rating'
  | '-rating'
  ;

export type GameListFilters = {
  search: string;
  platform: string | null;
  ordering: GameListOrdering | null;
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
