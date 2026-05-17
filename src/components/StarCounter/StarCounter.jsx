import Icon from '../Icon/Icon';
import styles from './StarCounter.module.css';

function StarCounter({ count = 0 }) {
  return (
    <span className={styles.starCounter}>
      <Icon name="star" size={20} />
      <span className={styles.count}>{count}</span>
    </span>
  );
}

export default StarCounter;
