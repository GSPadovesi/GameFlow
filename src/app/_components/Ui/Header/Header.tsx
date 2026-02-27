'use client';

import { Title } from '../Title';
import { HeaderProps } from './Header.types';
import { HeaderHamburguer } from './HeaderHamburguer/HeaderHamburguer';
import styles from './Header.module.scss';

export const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {

  return (
    <header className={styles.header}>
      <div className={styles.sidebarHeader}>
        <a href="https://emoji.gg/emoji/195326-bluespiral">
          <img src="https://cdn3.emoji.gg/emojis/195326-bluespiral.gif" width="30px" height="30px" alt="bluespiral" />
        </a>
        <Title variant="h2" size="xl" style={{ width: 'fit-content' }}>Gameflow</Title>
      </div>
      <HeaderHamburguer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={styles.headerContent}>
        <h1>Olá, mundo</h1>
      </div>
    </header >
  )
}