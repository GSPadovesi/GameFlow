'use client'

import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';

export function HomePage() {
  const [items, setItems] = useState<[]>([]);
  return (
    <div className={styles.homePage}>
      {items.length}
    </div>
  );
}
