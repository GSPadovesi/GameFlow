'use client';

import { GameList } from '../../Ui';
import { useCatalog } from '@/app/_hooks';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Route } from 'next';
import styles from './Catalog.module.scss';

export function CatalogPage() {
  const { items, loading, error, filters, setFilters, page, setPage, totalPages } = useCatalog();
  const router = useRouter();

  const handleAddGame = useCallback((id: number) => {
    console.log(id)
    router.push(`/catalogo/${id}/adicionar` as Route)
  }, [router])

  return (
    <div className={styles.catalogPage}>
      <GameList
        items={items}
        state={{
          loading,
          error,
        }}
        filters={{
          value: filters,
          onChange: setFilters,
        }}
        pagination={{
          currentPage: page,
          onPageChange: setPage,
          totalPages
        }}
        actions={{
          onGameClick: handleAddGame
        }}
      />
    </div>
  );
}
