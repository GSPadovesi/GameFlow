'use client';

import { Button } from '../Button/Button';
import { Title } from '../Title';
import { SidebarProps } from './Sidebar.types';

import cx from 'clsx';
import styles from './Sidebar.module.scss';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={cx(styles.sidebar, isOpen ? styles.open : '')}
    >
      <div className={styles.sidebarHeader}>
        <Title variant="h2" size="xl" style={{ width: 'fit-content' }}>Gameflow</Title>
      </div>
      <h1>Olá, mundo</h1>
    </aside>
  );
}