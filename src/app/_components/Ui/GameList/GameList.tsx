import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { GameCard } from "../GameCard";
import { Field } from "../Field";
import { Skeleton } from "../Skeleton";
import { ArrowBigLeft, ArrowBigRight, Search } from "lucide-react";
import { getPaginationSpan } from "../../../../../utils";
import { refresh } from "next/cache";
import { platformOptions, genreOptions, developerOptions } from "./GameList.constants";
import type { GameListProps, GameListPlataform, GameListGenre, GameDeveloper } from "./GameList.types";
import clsx from "clsx";
import styles from './GameList.module.scss'
import { Title } from "../Title";
import { Button } from "../Button";

export const GameList: React.FC<GameListProps> = ({ items, state, filters, pagination }) => {
  const [search, setSearch] = useState<string>(filters.value.search);
  const isBackDisabled = !pagination?.onPageChange || pagination.currentPage <= 1;
  const isNextDisabled = pagination.currentPage >= pagination?.totalPages;
  const totalPages = getPaginationSpan(pagination.currentPage, pagination.totalPages);
  const gameRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)


  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(gameRef.current)
    setSearch(e.target.value)

    const time = setTimeout(() => {
      filters.onChange({
        ...filters.value,
        search: e.target.value
      });
    }, 500)

    gameRef.current = time;
  }, [filters])

  const onPlatformChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    filters.onChange({
      ...filters.value,
      platform: e.target.value ? e.target.value as GameListPlataform : null,
    });
  }, [filters]);

  const onGenreChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    filters.onChange({
      ...filters.value,
      genre: e.target.value ? e.target.value as GameListGenre : null
    })
  }, [filters]);

  const onDeveloperChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    filters.onChange({
      ...filters.value,
      developer: e.target.value ? e.target.value as GameDeveloper : null
    })
  }, [filters])

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
  }, []);

  return (
    <div className={styles.gameList}>
      <div className={styles.controls}>
        <Field
          type='input'
          id='search'
          name='search'
          placeholder='Procurar jogo'
          value={search}
          className={styles.searchField}
          iconLeft={<Search size={16} strokeWidth={2} />}
          onChange={onSearchChange}
        />
        <Field
          type='select'
          id='platform'
          name='platform'
          placeholder='Ordenar por plataforma'
          value={filters.value.platform ?? ''}
          options={platformOptions}
          className={styles.selectField}
          onChange={onPlatformChange}
        />
        <Field
          type='select'
          id='genre'
          name='genre'
          placeholder='Ordernar por gênero'
          value={filters.value.genre ?? ''}
          options={genreOptions}
          className={styles.selectField}
          onChange={onGenreChange}
        />
        {/** Ajustar futuramente pq editoras são com um tratamento diferente */}
        {/* <Field
          type='select'
          id='developer'
          name='developer'
          placeholder='Ordernar por desenvolvedora'
          value={filters.value.developer ?? ''}
          options={developerOptions}
          className={styles.selectField}
          onChange={onDeveloperChange}
        /> */}
      </div>
      <div className={styles.content}>
        {state?.error ? (
          <div className={styles.errorWrppae}>
            <Title>Houve um erro ao buscar jogos</Title>
            <Title variant="h2">Por favor, tente novamente!</Title>
            <Button>Tente novamente</Button>
          </div>
        ) : (
          <div className={styles.list}>
            {state?.loading
              ? Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} width="100%" height={260} borderRadius={12} />)
              : items.map((item, index) => <GameCard key={index} item={item} />)}
          </div>
        )}
      </div>
      <div className={styles.wrapperButton}>
        <button className={styles.button} onClick={handleBack} disabled={isBackDisabled}><ArrowBigLeft size={16} color="#fff" /></button>
        <div className={styles.wrapperSwiper}>
          <span className={styles.pageIndicator}>
            {pagination.currentPage} / {pagination.totalPages}
          </span>
          <div className={styles.swiperTrack}>
            {totalPages.map((page, index) => (
              <span
                key={index}
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
