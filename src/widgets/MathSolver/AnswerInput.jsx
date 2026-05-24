import styles from './AnswerInput.module.css';

export default function AnswerInput({ value, onDigit, onBackspace, onSubmit, disabled }) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''];

  return (
    <div className={styles.container} data-testid="answer-input">
      <div className={styles.display} data-testid="answer-display">
        {value || <span className={styles.placeholder}>0</span>}
      </div>
      <div className={styles.grid}>
        {digits.map((d, i) => {
          if (d === '') {
            return <div key={`empty-${i}`} className={styles.empty} />;
          }
          return (
            <button
              key={`digit-${d}`}
              className={styles.digit}
              onClick={() => onDigit(d)}
              disabled={disabled}
              data-testid={`digit-btn-${d}`}
            >
              {d}
            </button>
          );
        })}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.backspace}
          onClick={onBackspace}
          disabled={disabled || value.length === 0}
        >
          ⌫
        </button>
        <button
          className={styles.submit}
          onClick={onSubmit}
          disabled={disabled || value.length === 0}
        >
          OK
        </button>
      </div>
    </div>
  );
}
