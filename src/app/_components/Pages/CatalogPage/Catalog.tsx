'use client'

import { useEffect, useState } from 'react';
import { GameList } from '../../Ui';
import type { GameItem, GameListItem } from '../../Ui/GameList/GameList.types';
import styles from './Catalog.module.scss';

type RawGamePlatform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

type RawGameGenre = {
  id: number;
  name: string;
  slug: string;
};

type RawGame = {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number | null;
  rating_top: number | null;
  platforms: RawGamePlatform[];
  genres?: RawGameGenre[];
};

type GamesResponse = {
  results?: RawGame[];
};

export function CatalogPage() {
  const [items, setItems] = useState<GameListItem[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/games?page=${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: GamesResponse = await response.json();
        const mappedItems = (data.results ?? []).map((game): GameListItem => ({
          game: {
            id: game.id,
            slug: game.slug,
            name: game.name,
            released: game.released,
            backgroundImage: game.background_image,
            rating: game.rating,
            ratingTop: game.rating_top,
            platforms: game.platforms.map(({ platform }) => platform),
            genres: game.genres,
          } satisfies GameItem,
        }));

        setItems(mappedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className={styles.catalogPage}>
      <GameList items={items} />
    </div>
  );
}
