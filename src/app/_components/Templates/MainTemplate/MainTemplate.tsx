'use client';

import { useState } from "react";
import { Sidebar } from "../../Ui";
import styles from "./MainTemplate.module.scss";
import { Header } from "../../Ui/Header";

export function MainTemplate({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={styles.main}>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.content}>
        <Sidebar isOpen={isOpen} />
        {children}
      </div>
    </main>
  );
}