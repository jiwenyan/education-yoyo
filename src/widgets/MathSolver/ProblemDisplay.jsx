import styles from './ProblemDisplay.module.css';

export default function ProblemDisplay({ a, b, operator }) {
  return (
    <div className={styles.container} data-testid="problem-display">
      <span className={styles.number}>{a}</span>
      <span className={styles.operator}>{operator}</span>
      <span className={styles.number}>{b}</span>
      <span className={styles.equals}>=</span>
      <span className={styles.question}>?</span>
    </div>
  );
}
