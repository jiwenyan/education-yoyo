import { useMemo } from 'react';
import styles from './BreakTenHelp.module.css';

function TenFrame({ count, highlightStart, highlightCount, color }) {
  const dotColor = color || '#4a90d9';
  const cells = Array.from({ length: 10 }, (_, i) => {
    const isFilled = i < count;
    const isHighlighted = i >= highlightStart && i < highlightStart + highlightCount;
    return (
      <div key={i} className={styles.cell}>
        {isFilled && (
          <div
            className={`${styles.dot} ${isHighlighted ? styles.dotHighlight : ''}`}
            style={isHighlighted ? { background: '#e67e22' } : { background: dotColor }}
          />
        )}
      </div>
    );
  });

  return <div className={styles.tenFrame}>{cells}</div>;
}

export default function BreakTenHelp({ a, b, operator, onClose }) {
  const isSubtraction = operator === '-';

  const steps = useMemo(() => {
    if (!isSubtraction) return [];

    const answer = a - b;
    const ones = a % 10; // ones digit of a (works for 11-20)
    const needsBreakTen = b > ones;

    if (!needsBreakTen) {
      // Direct subtraction, no need to break ten
      return [
        {
          label: `Step 1: Subtract directly`,
          description: `Since ${b} is not more than the ${ones} ones in ${a}, subtract directly.`,
          tenFrameA: { count: a > 10 ? 10 : a, highlightStart: 0, highlightCount: 0, color: '#4a90d9' },
          extraOnes: a > 10 ? a - 10 : 0,
          equation: `${a} - ${b} = ${answer}`,
          isFinal: true,
        },
      ];
    }

    const first = ones; // amount to subtract first to reach 10
    const rest = b - ones; // remaining to subtract from 10

    return [
      {
        label: `Step 1: How many to reach 10?`,
        description: `${a} has ${ones} ones. Subtract ${ones} first to reach 10.`,
        decomposition: `Break ${b} into ${first} + ${rest}`,
        tenFrameA: { count: first, highlightStart: 0, highlightCount: first, color: '#e67e22' },
        equation: '',
      },
      {
        label: `Step 2: Subtract to reach 10`,
        description: `${a} - ${first} = 10`,
        tenFrameA: { count: 10, highlightStart: 0, highlightCount: 0, color: '#4a90d9' },
        equation: `${a} - ${first} = 10`,
      },
      {
        label: `Step 3: Subtract the remaining ${rest}`,
        description: `10 - ${rest} = ${answer}`,
        tenFrameA: { count: 10 - rest, highlightStart: 10 - rest, highlightCount: rest, color: '#e67e22' },
        equation: `10 - ${rest} = ${answer}`,
        isFinal: true,
      },
    ];
  }, [a, b, isSubtraction]);

  const answer = a - b;

  return (
    <div className={styles.overlay} data-testid="break-ten-help">
      <button
        className={styles.closeBtn}
        onClick={onClose}
        data-testid="break-ten-close"
        aria-label="Close help"
      >
        ✕
      </button>

      <h3 className={styles.title}>Break-Ten Strategy</h3>

      {!isSubtraction ? (
        <div className={styles.notApplicable}>
          The "Break-Ten" strategy works for subtraction problems.
        </div>
      ) : (
        <div className={styles.steps}>
          <div className={styles.problemHeader}>
            {a} − {b} = ?
          </div>

          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepLabel}>{step.label}</div>

              {step.description && (
                <div className={styles.stepDescription}>{step.description}</div>
              )}

              {step.decomposition && (
                <div className={styles.decomposeHint}>
                  Split up: {step.decomposition}
                </div>
              )}

              <TenFrame
                count={step.tenFrameA.count}
                highlightStart={step.tenFrameA.highlightStart}
                highlightCount={step.tenFrameA.highlightCount}
                color={step.tenFrameA.color}
              />

              {step.extraOnes !== undefined && step.extraOnes > 0 && (
                <div className={styles.extraOnes}>
                  + {step.extraOnes} more
                </div>
              )}

              {step.equation && (
                <div className={styles.stepEquation}>{step.equation}</div>
              )}

              {step.isFinal && (
                <div className={styles.answerRow}>
                  {a} − {b} = {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
