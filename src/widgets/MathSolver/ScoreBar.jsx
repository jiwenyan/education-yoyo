import { useMemo } from 'react';
import styles from './ScoreBar.module.css';

export default function ScoreBar({ correct, total }) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const fillStyle = useMemo(() => ({ width: `${percentage}%` }), [percentage]);

  return (
    <div className={styles.container} data-testid="score-bar">
      <div className={styles.label}>
        {correct} / {total}
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={fillStyle}
          data-testid="score-fill"
        />
      </div>
    </div>
  );
}
