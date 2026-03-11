'use client';

import { Search } from 'lucide-react';
import { HeaderProps } from './Header.types';
import { HeaderHamburguer } from './HeaderHamburguer/HeaderHamburguer';
import { Field } from '../Field';
import styles from './Header.module.scss';

export const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {

  return (
    <header className={styles.header}>
      <HeaderHamburguer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </header >
  )
}
