import styles from "./MainTemplate.module.scss";

export function MainTemplate({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}