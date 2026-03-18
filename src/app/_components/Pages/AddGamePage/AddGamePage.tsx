'use client';

import { useEffect, useState } from 'react';
import { Title, Paragraph } from '../../Ui';
import styles from './AddGamePage.module.scss';
import { Game } from '@/app/_types';
import { useParams } from 'next/navigation';

export function AddGamePage() {
  const [game, setGame] = useState<Game>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/games/${gameId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const data: Game = await response.json();
        console.log(data)
        setGame(data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true)

      } finally {
        setLoading(false);
      }

    }
    fetchData();

  }, [])

  return (
    <div className={styles.addGamePage}>
      <div className={styles.header}>
        <Title style={{ width: 'auto', margin: '0' }} variant='h1' size='3xl'>Adicionar à biblioteca</Title>
        <Paragraph style={{ width: 'auto', margin: '0' }} color='#868cab'>Defina seu status e personalize esse jogo na sua coleção</Paragraph>
      </div>
    </div>
  );
}
