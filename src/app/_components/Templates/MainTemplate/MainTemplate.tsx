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
      <Sidebar isOpen={isOpen} />
      <div className={styles.content}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </div>
    </main>
  );
}