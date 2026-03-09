import { GameCard } from "../GameCard";
import { GameListProps } from "./GameList.types";
import styles from './GameList.module.scss'

export const GameList: React.FC<GameListProps> = ({ items }) => {

  return (
    <div className={styles.gameList}>
      <div>
        <h1>Items aqui</h1>
      </div>
      <div className={styles.listGrid}>
        {items.map((item, index) => (
          <GameCard key={index} item={item} />
        ))}
      </div>
    </div>
  )
}