'use client';

import { useEffect, useMemo, useState } from 'react';
import { Title, Paragraph, Button, Skeleton } from '../../Ui';
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
  const { gameId } = useParams();
  const router = useRouter();

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
        <Title style={{ width: 'auto', margin: '0' }} variant='h1' size='3xl'>Adicionar Ã  biblioteca</Title>
        <Paragraph style={{ width: 'auto', margin: '0' }} color='#868cab'>Defina seu status e personalize esse jogo na sua coleÃ§Ã£o</Paragraph>
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
                <Button variant='secondary' onClick={() => router.back()}>Voltar ao catalogo</Button>
              </div>
            </div>
            <div className={styles.formContent}>
              <Title variant='h2'>Status</Title>
              <Field
                type='radio'
                id='status'
                name='status'
                value={status}
                options={statusOptions}
                onChange={(event) => setStatus(event.target.value as GameStatus)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
