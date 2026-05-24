import styles from './FeedbackOverlay.module.css';

export default function FeedbackOverlay({ correct, correctAnswer, onNext }) {
  return (
    <div
      className={`${styles.overlay} ${correct ? styles.correct : styles.incorrect}`}
      data-testid="feedback-overlay"
    >
      <div className={styles.emoji}>
        {correct ? '🎉' : '😅'}
      </div>
      <div className={styles.message}>
        {correct ? 'Correct!' : `Not quite! The answer was ${correctAnswer}`}
      </div>
      <button className={styles.nextBtn} onClick={onNext}>
        Next
      </button>
    </div>
  );
}
