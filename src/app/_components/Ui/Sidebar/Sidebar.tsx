'use client';

import { Button } from '../Button/Button';
import { Title } from '../Title';
import { SidebarProps } from './Sidebar.types';

import cx from 'clsx';
import styles from './Sidebar.module.scss';
import { usePathname, useRouter } from 'next/navigation';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const route = useRouter();
  const isHomePage = pathname === 'home';

  return (
    <aside
      className={cx(styles.sidebar, isOpen ? styles.open : '')}
    >
      <div className={styles.sidebarHeader}>
        <Title variant="h2" size="xl" style={{ width: 'fit-content' }}>Gameflow</Title>
      </div>
      <div className={styles.content}>
        {!isHomePage ?
          <Button variant='secondary' style={{ alignSelf: 'center' }} onClick={() => route.push('/home')}>Voltar para biblioteca</Button>
          : <h1>Em construção</h1>
        }
      </div>
    </aside>
  );
}