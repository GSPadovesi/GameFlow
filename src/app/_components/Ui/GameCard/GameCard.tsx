'use client';

import type { KeyboardEvent } from 'react';
import type { GameCardProps } from './GameCard.types';
import { Title } from '../Title';
import { Paragraph } from '../Paragraph';
import { plataformsMap } from './GameCard.constants';
import { Plus } from 'lucide-react';
import styles from './GameCard.module.scss';
import clsx from 'clsx';


export const GameCard: React.FC<GameCardProps> = ({ item, className, onClick }) => {
  const { game } = item;
  const coverImage = game.backgroundImage ?? '';
  const platforms = game?.platforms?.map((platform) => platform.slug);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(item);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.contentImage}>
        <img className={styles.cover} src={coverImage} alt={game.name} />
      </div>
      <div className={styles.content}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Title style={{ width: 'auto', margin: '0' }} variant='h6' size='md'>{game.name}</Title>
          <Title style={{ width: 'auto', margin: '0' }} variant='h6' size='md'>{game.rating}</Title>
        </div>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {platforms.slice(0, 3).map((label, index) => (
            <div key={index} className={styles.plataformCard} >
              {plataformsMap[label]?.icon}
              <Paragraph style={{ width: 'auto', margin: '0' }} fontSize='12px'>{plataformsMap[label]?.name}</Paragraph>
            </div>
          ))}
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={clsx(styles.button, styles.add)}><Plus size={16} color="#fff" /></button>
        </div>
      </div>
    </div>
  );
};
