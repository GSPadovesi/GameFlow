import { useCallback } from "react";
import { GameCard } from "../GameCard";
import { GameListProps } from "./GameList.types";
import { Field } from "../Field";
import { Skeleton } from "../Skeleton";
import { ArrowBigLeft, ArrowBigRight, Search } from "lucide-react";
import { getPaginationSpan } from "../../../../../utils";
import styles from './GameList.module.scss'
import clsx from "clsx";
import { refresh } from "next/cache";

export const GameList: React.FC<GameListProps> = ({ items, state, filters, pagination }) => {
  const isBackDisabled = !pagination?.onPageChange || pagination.currentPage <= 1;
  const isNextDisabled = pagination.currentPage >= pagination?.totalPages;
  const totalPages = getPaginationSpan(pagination.currentPage, pagination.totalPages);

  const handleBack = useCallback(() => {
    if (!pagination) return;
    pagination?.onPageChange(pagination.currentPage - 1)
  }, [pagination]);

  const handleNext = useCallback(() => {
    if (!pagination) return;
    pagination?.onPageChange(pagination?.currentPage + 1)
  }, [pagination]);

  const handleRetry = useCallback(() => {
    refresh();
  }, [])


  if (state?.error) {
    return (
      <div className={styles.errorPage}>
        <h1>Erro ao carregar a lista</h1>
        <button onClick={handleRetry}>Tentar novamente</button>
      </div>
    )
  }

  return (
    <div className={styles.gameList}>
      <div style={{ width: '100%' }}>
        <Field
          type='input'
          id='search'
          name='search'
          placeholder='Search...'
          value={filters?.value?.search}
          onChange={e => filters?.onChange?.({
            ...filters.value,
            search: e.target.value,
          })}
          className={styles.searchField}
          iconLeft={<Search size={16} strokeWidth={2} />}
          style={{ minWidth: '200px' }}
        />
        {/* <Field
          type="select"
          id="select-gen"
        /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {state?.loading
            ? Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} width="100%" height={260} borderRadius={12} />)
            : items.map((item, index) => <GameCard key={index} item={item} />)}
        </div>
      </div>
      <div className={styles.wrapperButton}>
        <button className={styles.button} onClick={handleBack} disabled={isBackDisabled}><ArrowBigLeft size={16} color="#fff" /></button>
        <div className={styles.wrapperSwiper}>
          <span className={styles.pageIndicator}>
            {pagination.currentPage} / {pagination.totalPages}
          </span>
          <div className={styles.swiperTrack}>
            {totalPages.map((page) => (
              <span
                key={page}
                className={clsx(styles.swiper, pagination.currentPage === page && styles.swiperActive)}
              />
            ))}
          </div>
        </div>
        <button className={styles.button} onClick={handleNext} disabled={isNextDisabled}><ArrowBigRight size={16} color="#fff" /></button>
      </div>
    </div>
  )
}
