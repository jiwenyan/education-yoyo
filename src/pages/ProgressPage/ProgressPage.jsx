import { useMemo } from 'react';
import { useAppContext } from '../../services/AppContext';
import { alphabetData } from '../../utils/alphabetData';
import styles from './ProgressPage.module.css';

function ProgressPage() {
  const { state } = useAppContext();
  const { mathStats, alphabetProgress } = state;

  const mathAccuracy = useMemo(() => {
    if (mathStats.totalAttempted === 0) return 0;
    return Math.round((mathStats.totalCorrect / mathStats.totalAttempted) * 100);
  }, [mathStats]);

  const alphabetPct = useMemo(() => {
    return Math.round((alphabetProgress.length / alphabetData.length) * 100);
  }, [alphabetProgress]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Progress</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mathematics</h2>
        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{mathStats.totalAttempted}</div>
            <div className={styles.statLabel}>Problems Attempted</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{mathStats.totalCorrect}</div>
            <div className={styles.statLabel}>Correct</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{mathAccuracy}%</div>
            <div className={styles.statLabel}>Accuracy</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Alphabet</h2>
        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{alphabetProgress.length}</div>
            <div className={styles.statLabel}>Letters Traced</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{alphabetPct}%</div>
            <div className={styles.statLabel}>Complete</div>
          </div>
        </div>
        <div className={styles.letterGrid}>
          {alphabetData.map((item) => (
            <div
              key={item.letter}
              className={`${styles.letterBadge} ${
                alphabetProgress.includes(item.letter) ? styles.completed : ''
              }`}
            >
              {item.letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
