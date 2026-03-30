'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Title, Paragraph, Button, Skeleton, ToggleSwitch } from '../../Ui';
import { Game, GameResponse, GameStatus } from '@/app/_types';
import { useParams, useRouter } from 'next/navigation';
import { plataformsMap } from '../../Ui/GameCard/GameCard.constants';
import { Star } from "lucide-react";
import styles from './AddGamePage.module.scss';
import { Field } from '../../Ui/Field';
import { statusOptions } from './AddGamePage.constants';

export function AddGamePage() {
  const [game, setGame] = useState<Game>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<GameStatus>('wishlist');
  const [favorite, setFavorite] = useState<boolean>(false);
  const [assessment, setAssessment] = useState<number | ''>('');
  const [date, setDate] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const { gameId } = useParams();
  const router = useRouter();

  const onStatusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as GameStatus);
  }, []);
  const onAssessmentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAssessment(value === '' ? '' : Number(value));
  }, []);
  const onDateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }, []);
  const onNoteChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  }, []);

  const hasValue = useMemo(() => {
    return status && assessment && date;
  }, [status, assessment, date]);

  const onAddGame = useCallback(async () => {
    setLoading(true);
    try {

    } catch {

    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/games/${gameId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const data: GameResponse = await response.json();
        setGame({
          id: data.id,
          slug: data.slug,
          name: data.name,
          released: data.released,
          backgroundImage: data.background_image,
          rating: data.rating,
          ratingTop: data.rating_top,
          platforms: data.platforms.map(({ platform }) => platform),
          genres: data.genres,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId]);

  if (error) {
    <div><h1>Erro ao buscar game, tente novamente mais tarde</h1></div>
  }

  return (
    <div className={styles.addGamePage}>
      <div className={styles.header}>
        <Title style={{ width: 'auto', margin: '0' }} variant='h1' size='3xl'>Adicionar à biblioteca</Title>
        <Paragraph style={{ width: 'auto', margin: '0' }} fontColor='#868cab'>Defina seu status e personalize esse jogo na sua coleção</Paragraph>
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <>
            <div className={styles.card}>
              <Skeleton width="100%" height={320} borderRadius={16} />
              <div className={styles.cardContent}>
                <Skeleton width="70%" height={36} borderRadius={8} />
                <div className={styles.plataformsWrapper}>
                  <Skeleton width={96} height={32} borderRadius={999} />
                  <Skeleton width={88} height={32} borderRadius={999} />
                  <Skeleton width={104} height={32} borderRadius={999} />
                </div>
                <div className={styles.wrapper}>
                  <Skeleton width={120} height={28} borderRadius={999} />
                  <Skeleton width={140} height={20} borderRadius={999} />
                </div>
                <span className={styles.span} />
                <div className={styles.wrapper}>
                  <Skeleton width={72} height={32} borderRadius={999} />
                  <Skeleton width={84} height={32} borderRadius={999} />
                  <Skeleton width={76} height={32} borderRadius={999} />
                </div>
                <Skeleton width={180} height={44} borderRadius={999} />
              </div>
            </div>
            <div className={styles.formContent}>
              <Skeleton width="100%" height={280} borderRadius={16} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.card}>
              <img className={styles.cover} src={game?.backgroundImage ?? ''} />
              <div className={styles.cardContent}>
                <Title style={{ width: 'auto', margin: '0' }} variant='h3'>{game?.name}</Title>
                <div className={styles.plataformsWrapper}>
                  {game?.platforms?.slice(0, 3).map((item, index) => (
                    <div key={index} className={styles.plataformCard}>
                      {plataformsMap[item.slug]?.icon}
                      <Paragraph style={{ width: 'auto', margin: '0' }} fontSize='12px'>{plataformsMap[item.slug]?.name}</Paragraph>
                    </div>
                  ))}
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.wrapper}>
                    <div className={styles.plataformCard}>
                      <Star
                        size={20}
                        style={{
                          cursor: "pointer",
                          transition: "0.2s",
                          fill: "#FFD700",
                          stroke: "#FFD700"
                        }}
                      />
                      <Paragraph style={{ width: 'auto', margin: '0' }} fontSize='12px'>{game?.rating}</Paragraph>
                    </div>
                    <div className={styles.wrapper} style={{ gap: '6px' }}>
                      {[1, 2, 3, 4, 5].map((item, index) => (
                        <Star
                          key={index}
                          size={16}
                          style={{
                            cursor: "pointer",
                            transition: "0.2s",
                            fill: item <= (game?.rating ?? 0) ? "#FFD700" : "transparent",
                            stroke: item <= (game?.rating ?? 0) ? "#FFD700" : "#555",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className={styles.span} />
                <div className={styles.wrapper}>
                  {game?.genres?.map((item, index) => (
                    <div key={index} className={styles.plataformCard}>
                      <Paragraph style={{ width: 'auto', margin: '0' }} fontSize='12px'>{item.name}</Paragraph>
                    </div>
                  ))}
                </div>
                <Button variant='secondary' onClick={() => router.back()} style={{ width: '100%' }}>Voltar ao catalogo</Button>
              </div>
            </div>
            <div className={styles.formContent}>
              <Title style={{ width: 'auto', margin: '0' }} variant='h2'>Status</Title>

              <Field
                type='radio'
                id='status'
                name='status'
                value={status}
                options={statusOptions}
                onChange={onStatusChange}
                disabled={!game}
              />
              <ToggleSwitch
                id='favorite'
                label='Marcar como favorito'
                checked={favorite}
                disabled={!game}
                onChange={setFavorite}
              />
              <span className={styles.span} />
              <Title style={{ width: 'auto', margin: '0' }} variant='h2'>Sua avaliação</Title>
              <Field
                type='number'
                id='Assessment'
                name='assessment'
                value={assessment}
                onChange={onAssessmentChange}
              />
              <Title style={{ width: 'auto', margin: '0' }} variant='h2'>Coloque o ano em que foi jogado</Title>
              <Field
                type='date'
                id='playedAt'
                name='playedAt'
                value={date}
                onChange={onDateChange}
              />
              <Title style={{ width: 'auto', margin: '0' }} variant='h2'>Anotações pessoais</Title>
              <Field
                type='textarea'
                id='notes'
                name='notes'
                value={note}
                onChange={onNoteChange}
                disabled={!game}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant='secondary' onClick={() => router.back()}>Cancelar</Button>
                <Button disabled={!hasValue || isLoading} onClick={onAddGame}>Salvar jogo</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
