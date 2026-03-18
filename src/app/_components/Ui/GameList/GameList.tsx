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

export const GameList: React.FC<GameListProps> = ({ items, state, filters, pagination, actions }) => {
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

  const handleAddClick = useCallback((id: number) => {
    if (!actions?.onGameClick) return;
    actions.onGameClick(id);
  }, [actions])

  interface tarefasProps {
    id: number,
    titulo: string,
    responsavel: string,
    status: string,
    prioridade: string
  }

  interface reduceProps {
    responsaveis: Record<string, number>;
    colunas: {
      todo: any[];
      doing: any[];
      done: any[];
    };
  }

  const tarefas: tarefasProps[] = [
    { id: 1, titulo: 'Criar login', responsavel: 'Ana', status: 'done', prioridade: 'alta' },
    { id: 2, titulo: 'Criar API', responsavel: 'Carlos', status: 'doing', prioridade: 'alta' },
    { id: 3, titulo: 'Criar testes', responsavel: 'Ana', status: 'todo', prioridade: 'baixa' },
    { id: 4, titulo: 'Review PR', responsavel: 'Carlos', status: 'done', prioridade: 'media' },
    { id: 5, titulo: 'Deploy', responsavel: 'Bia', status: 'todo', prioridade: 'alta' },
    { id: 6, titulo: 'Documentação', responsavel: 'Bia', status: 'doing', prioridade: 'baixa' },
    { id: 7, titulo: 'Hotfix', responsavel: 'Ana', status: 'doing', prioridade: 'alta' },
  ];

  const orderByPriorit: any = {
    "alta": 1,
    "media": 2,
    "baixa": 3
  }

  const { colunas, responsaveis } = tarefas.reduce<reduceProps>((acc, item) => {
    if (!acc.responsaveis) acc.responsaveis = {};
    acc.responsaveis[item.responsavel] = (acc.responsaveis[item?.responsavel] ?? 0) + 1
    if (item.status === 'todo') {
      acc.colunas[item.status].push({
        titulo: item.titulo,
        prioridade: item.prioridade
      })
    }

    if (item.status === 'doing') {
      acc.colunas[item.status].push({
        titulo: item.titulo,
        prioridade: item.prioridade
      })
    }

    if (item.status === 'done') {
      acc.colunas[item.status].push({
        titulo: item.titulo,
        prioridade: item.prioridade
      })
    }

    return acc;
  }, {
    responsaveis: {},
    colunas: {
      todo: [],
      doing: [],
      done: []
    }
  })

  const novaOrdemColunas = {
    todo: colunas.todo.sort((a, b) => orderByPriorit[a.prioridade] - orderByPriorit[b.prioridade]).map(item => item.titulo),
    doing: colunas.doing.sort((a, b) => orderByPriorit[a.prioridade] - orderByPriorit[b.prioridade]).map(item => item.titulo),
    done: colunas.done.sort((a, b) => orderByPriorit[a.prioridade] - orderByPriorit[b.prioridade]).map(item => item.titulo)
  }
  console.log(items)

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
              : items.map((item, index) => (
                <GameCard
                  key={index}
                  item={item}
                  onClick={handleAddClick}
                />
              ))}
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
