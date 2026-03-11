'use client';

import { useState } from "react";
import { Sidebar } from "../../Ui";
import { Header } from "../../Ui/Header";
import styles from "./MainTemplate.module.scss";

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
        <section className={styles.section}>
          {children}
        </section>
      </div>
    </main>
  );
}