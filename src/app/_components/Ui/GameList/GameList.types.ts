export type GameStatus = 'wishlist' | 'playing' | 'completed' | 'dropped';

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

export type GameItem = {
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

export type GameUserState = {
  status: GameStatus | null;
  favorite: boolean;
};

export type GameListItem = {
  game: GameItem;
  userState?: GameUserState | null;
};

export type GameListState = {
  loading?: boolean;
  emptyMessage?: string;
  errorMessage?: string | null;
};

export type GameListActions = {
  onGameClick?: (item: GameListItem) => void;
  onStatusChange?: (item: GameListItem, status: GameStatus) => void;
  onFavoriteToggle?: (item: GameListItem) => void;
};

export type GameListOrdering =
  | 'name'
  | '-name'
  | 'released'
  | '-released'
  | 'rating'
  | '-rating';

export type GameListFilters = {
  search: string;
  platform: string | null;
  ordering: GameListOrdering | null;
};

export type GameListFilterProps = {
  value: GameListFilters;
  onChange?: (filters: GameListFilters) => void;
  onReset?: () => void;
};

export type GameListPagination = {
  currentPage: number;
  totalItems?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onPageChange?: (page: number) => void;
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
  items: GameListItem[];
  className?: string;
  state?: GameListState;
  actions?: GameListActions;
  filters?: GameListFilterProps;
  pagination?: GameListPagination;
  options?: GameListOptions;
};