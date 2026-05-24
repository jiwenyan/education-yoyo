import { useMemo } from 'react';
import Card from '../../components/Card/Card';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import styles from './SubjectCard.module.css';

export default function SubjectCard({ title, description, icon, color, progress, stars, onStart }) {
  const cardStyle = useMemo(() => ({ '--subject-color': color }), [color]);
  const progressStyle = useMemo(() => ({ width: `${progress}%` }), [progress]);

  return (
    <Card className={styles.card} style={cardStyle}>
      <div className={styles.header}>
        <Icon name={icon} size={32} />
        <h2 className={styles.title}>{title}</h2>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.stats}>
        {progress != null && (
          <div className={styles.stat}>
            <span className={styles.statLabel}>Progress</span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={progressStyle}
              />
            </div>
            <span className={styles.statValue}>{progress}%</span>
          </div>
        )}

        {stars != null && (
          <div className={styles.stat}>
            <span className={styles.statLabel}>Stars</span>
            <span className={styles.starsValue}>{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button variant="primary" onClick={onStart}>
          Start Learning
        </Button>
      </div>
    </Card>
  );
}
