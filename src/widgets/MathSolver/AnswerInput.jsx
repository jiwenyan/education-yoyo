import { useRef, useEffect, useCallback } from 'react';
import styles from './AnswerInput.module.css';

export default function AnswerInput({ value, onDigit, onBackspace, onSubmit, disabled }) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''];
  const inputRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;

      if (e.key === 'Enter') {
        onSubmit();
        return;
      }

      if (e.key === 'Backspace') {
        onBackspace();
        return;
      }

      if (/^[0-9]$/.test(e.key)) {
        onDigit(e.key);
        return;
      }

      e.preventDefault();
    },
    [disabled, onSubmit, onBackspace, onDigit]
  );

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.container} data-testid="answer-input">
      <div
        ref={inputRef}
        className={styles.display}
        data-testid="answer-display"
        tabIndex={0}
        role="textbox"
        aria-label="Answer input"
      >
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
