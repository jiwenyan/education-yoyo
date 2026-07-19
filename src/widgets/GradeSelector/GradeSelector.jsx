import styles from './GradeSelector.module.css';
import { GRADE_TABLES } from '../../utils/multiplicationTables';

const GRADE_ENTRIES = [2, 3, 4, 5];

const GRADE_COLORS = {
  2: '#27ae60',
  3: '#4a90d9',
  4: '#e67e22',
  5: '#8e44ad',
};

export default function GradeSelector({ onSelect, onBack }) {
  return (
    <div className={styles.container} data-testid="grade-selector">
      <h2 className={styles.heading}>Choose Your Grade</h2>
      <p className={styles.subheading}>Pick the level that matches what you're learning in school.</p>
      <div className={styles.grid}>
        {GRADE_ENTRIES.map((grade) => {
          const info = GRADE_TABLES[grade];
          return (
            <button
              key={grade}
              className={styles.card}
              style={{ '--card-color': GRADE_COLORS[grade] }}
              onClick={() => onSelect(grade)}
              data-testid={`grade-btn-${grade}`}
              aria-label={`${info.label}: ${info.description}`}
            >
              <span className={styles.icon}>{info.icon}</span>
              <span className={styles.gradeLabel}>{info.label}</span>
              <span className={styles.description}>{info.description}</span>
              <span className={styles.tablesHint}>
                {info.multiDigit ? 'multi-digit' : info.tables.map((t) => `×${t}`).join(', ')}
              </span>
            </button>
          );
        })}
      </div>
      {onBack && (
        <button
          className={styles.backBtn}
          onClick={onBack}
          data-testid="grade-selector-back"
          aria-label="Back to operation selection"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
