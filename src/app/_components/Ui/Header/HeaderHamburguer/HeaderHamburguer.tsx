import { HeaderHamburguerProps } from '../Header.types';
import styles from './HeaderHamburguer.module.scss';
import cx from 'clsx';


export const HeaderHamburguer: React.FC<HeaderHamburguerProps> = ({ isOpen, onClick }) => {

  const onHamburguerClick = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <div className={cx(styles.headerHamburguer, isOpen ? styles.headerHamburguerOpen : '')} onClick={onHamburguerClick}>
      <div className={cx(styles.hamburguer, isOpen ? styles.hamburguerOpen : '')}></div>
    </div>
  )
}
