'use client';

import { GameList } from '../../Ui';
import { useCatalogProvider } from '@/app/_providers/CatalogProvider/CatalogProvider';
import styles from './Catalog.module.scss';

export function CatalogPage() {
  const { items, loading, error, filters, setFilters, page, setPage, totalPages } = useCatalogProvider();

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
