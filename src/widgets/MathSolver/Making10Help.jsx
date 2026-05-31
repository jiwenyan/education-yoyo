import { useMemo } from 'react';
import styles from './Making10Help.module.css';

function TenFrame({ count, highlightStart, highlightCount }) {
  const cells = Array.from({ length: 10 }, (_, i) => {
    const isFilled = i < count;
    const isHighlighted = i >= highlightStart && i < highlightStart + highlightCount;
    return (
      <div key={i} className={styles.cell}>
        {isFilled && (
          <div
            className={`${styles.dot} ${isHighlighted ? styles.dotHighlight : ''}`}
          />
        )}
      </div>
    );
  });

  return <div className={styles.tenFrame}>{cells}</div>;
}

export default function Making10Help({ a, b, operator, onClose }) {
  const isAddition = operator === '+';

  const steps = useMemo(() => {
    if (!isAddition) return [];

    // The "making 10" strategy:
    // To add a + b:
    // 1. Figure out how many more to reach 10 from a: need = 10 - a
    // 2. Split b into (need) + (b - need)
    // 3. a + need = 10
    // 4. 10 + remainder = answer

    const need = Math.max(0, Math.min(10 - a, b));
    const remainder = b - need;
    const answer = a + b;

    return [
      {
        label: `Step 1: How many more to make 10?`,
        description: `${a} needs ${need} more to reach 10.`,
        decomposition: `${b} → ${need} + ${remainder}`,
        tenFrameA: { count: a, highlightStart: 0, highlightCount: 0 },
        tenFrameB: { count: b, highlightStart: 0, highlightCount: need },
        equation: '',
      },
      {
        label: `Step 2: Move ${need} over to make 10`,
        description: `${a} + ${need} = 10`,
        decomposition: '',
        tenFrameA: { count: 10, highlightStart: a, highlightCount: need },
        tenFrameB: { count: remainder, highlightStart: 0, highlightCount: 0 },
        equation: `${a} + ${need} = 10`,
      },
      {
        label: `Step 3: Add the remaining ${remainder}`,
        description: `10 + ${remainder} = ${answer}`,
        decomposition: '',
        tenFrameA: { count: 10, highlightStart: 0, highlightCount: 0 },
        tenFrameB: { count: remainder, highlightStart: 0, highlightCount: 0 },
        equation: `10 + ${remainder} = ${answer}`,
      },
    ];
  }, [a, b, isAddition]);

  return (
    <div className={styles.overlay} data-testid="making-10-help">
      <button
        className={styles.closeBtn}
        onClick={onClose}
        data-testid="making-10-close"
        aria-label="Close help"
      >
        ✕
      </button>

      <h3 className={styles.title}>Making 10 Strategy</h3>

      {!isAddition ? (
        <div className={styles.notApplicable}>
          The "Making 10" strategy works best for addition problems.
        </div>
      ) : (
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepLabel}>{step.label}</div>

              {step.decomposition && (
                <div className={styles.decomposeHint}>
                  Split up: {step.decomposition}
                </div>
              )}

              {i === 0 && (
                <div className={styles.decomposeHint}>
                  {step.description}
                </div>
              )}

              {i === 1 && (
                <div className={styles.decomposeHint}>
                  {step.description}
                </div>
              )}

              <TenFrame
                count={step.tenFrameA.count}
                highlightStart={step.tenFrameA.highlightStart}
                highlightCount={step.tenFrameA.highlightCount}
              />

              {i > 0 && step.tenFrameB.count > 0 && (
                <>
                  <TenFrame
                    count={step.tenFrameB.count}
                    highlightStart={step.tenFrameB.highlightStart}
                    highlightCount={step.tenFrameB.highlightCount}
                  />
                </>
              )}

              {step.equation && (
                <div className={styles.stepEquation}>{step.equation}</div>
              )}

              {i === 2 && (
                <div className={styles.answerRow}>
                  {a} + {b} = {a + b}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
