'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { GameListFilters } from '@/app/_components/Ui/GameList/GameList.types';
import type { UserGameItem } from '@/app/_types/user-game.types';

export type CatalogProviderValue = {
  items: UserGameItem[];
  loading: boolean;
  error: boolean | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filters: GameListFilters;
  setFilters: React.Dispatch<React.SetStateAction<GameListFilters>>;
  totalPages: number;
};

type GamePlatform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

type GameGenre = {
  id: number;
  name: string;
  slug: string;
};

type Game = {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number | null;
  rating_top: number | null;
  platforms: GamePlatform[];
  genres?: GameGenre[];
};

type GamesResponse = {
  count: number;
  results?: Game[];
};

export type CatalogProviderProps = {
  children: React.ReactNode;
};

const CatalogContext = createContext<CatalogProviderValue | null>(null);

export function CatalogProvider({ children }: CatalogProviderProps) {
  const [items, setItems] = useState<UserGameItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0)
  const [filters, setFilters] = useState<GameListFilters>({
    search: '',
    platform: null,
    ordering: null,
  });

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page: String(page),
        });

        if (filters.search) {
          params.append('search', filters.search);
        }

        // const response = await fetch(`/api/games?page=${page}${filters.search && `&search=${encodeURIComponent(filters.search)}`}`, {
        const response = await fetch(`/api/games?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);


        const data: GamesResponse = await response.json();
        const mappedItems = (data.results ?? []).map((game): UserGameItem => ({
          game: {
            id: game.id,
            slug: game.slug,
            name: game.name,
            released: game.released,
            backgroundImage: game.background_image,
            rating: game.rating,
            ratingTop: game.rating_top,
            platforms: game?.platforms?.map(({ platform }) => platform),
            genres: game.genres,
          },
        }));
        setTotalCount(data.count ?? 0)
        setItems(mappedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, filters]);

  return (
    <CatalogContext.Provider
      value={{
        items,
        loading,
        error,
        page,
        setPage,
        filters,
        setFilters,
        totalPages: Math.ceil(totalCount / 20) || 0
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogProvider() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error('useCatalogProvider must be used within CatalogProvider');

  return context;
}
