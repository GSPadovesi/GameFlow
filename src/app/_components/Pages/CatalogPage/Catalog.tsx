'use client';

import { GameList } from '../../Ui';
import { useCatalog } from '@/app/_hooks';
import styles from './Catalog.module.scss';

export function CatalogPage() {
  const { items, loading, error, filters, setFilters, page, setPage, totalPages } = useCatalog();

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
      />
    </div>
  );
}
