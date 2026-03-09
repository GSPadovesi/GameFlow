'use client';

import type { KeyboardEvent } from 'react';
import type { GameCardProps } from './GameCard.types';
import { Title } from '../Title';
import styles from './GameCard.module.scss';



export const GameCard: React.FC<GameCardProps> = ({ item, className, onClick }) => {
  const { game } = item;
  const coverImage = game.backgroundImage ?? '';
  const platforms = game.platforms.map((platform) => platform.name);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(item);
    }
  };

  console.log({ game, platforms })

  return (
    <div className={styles.card}>
      <div className={styles.contentImage}>
        <img className={styles.cover} src={coverImage} alt={game.name} />
      </div>
      <div className={styles.content}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Title style={{ width: 'auto' }} variant='h6' size='md'>{game.name}</Title>
          <Title style={{ width: 'auto' }} variant='h6' size='md'>{game.rating}</Title>
        </div>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
          {platforms.map((label, index) => (
            <h1 key={index}>{label}</h1>
          ))}
        </div>
      </div>
    </div>
  );
};
