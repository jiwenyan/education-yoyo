import { useMemo } from 'react';
import styles from './ArrayHelp.module.css';

const MAX_VISUAL = 12;

function ArrayGrid({ columns, rows, totalCells }) {
  // Cap visual display for large numbers
  const visCols = Math.min(columns, MAX_VISUAL);
  const visRows = Math.min(rows, MAX_VISUAL);

  const gridCells = [];
  for (let r = 0; r < visRows; r++) {
    for (let c = 0; c < visCols; c++) {
      gridCells.push(
        <div
          key={`${r}-${c}`}
          className={styles.dot}
          style={{
            backgroundColor: `hsl(${(c / visCols) * 60 + 200}, 70%, 60%)`,
          }}
        />
      );
    }
  }

  return (
    <div
      className={styles.arrayGrid}
      style={{
        gridTemplateColumns: `repeat(${visCols}, 1fr)`,
      }}
    >
      {gridCells}
    </div>
  );
}

function RepeatedAddition({ a, b }) {
  // Display b + b + ... + b (a times) = answer
  const terms = Array.from({ length: Math.min(a, 20) }, () => b);
  const displayTerms = terms.join(' + ');
  const suffix = a > 20 ? ' + ...' : '';

  return (
    <div className={styles.repeatedAddition}>
      <div className={styles.raLabel}>Repeated addition:</div>
      <div className={styles.raEquation}>
        {displayTerms}{suffix} = {a * b}
      </div>
    </div>
  );
}

function CompactBreakdown({ a, b }) {
  // Compact arithmetic breakdown for multi-digit
  const answer = a * b;
  const aTens = Math.floor(a / 10) * 10;
  const aOnes = a % 10;
  const bTens = Math.floor(b / 10) * 10;
  const bOnes = b % 10;

  const steps = [];
  if (aTens > 0 && bTens > 0) {
    steps.push(`${aTens} × ${bTens} = ${aTens * bTens}`);
  }
  if (aTens > 0 && bOnes > 0) {
    steps.push(`${aTens} × ${bOnes} = ${aTens * bOnes}`);
  }
  if (aOnes > 0 && bTens > 0) {
    steps.push(`${aOnes} × ${bTens} = ${aOnes * bTens}`);
  }
  if (aOnes > 0 && bOnes > 0) {
    steps.push(`${aOnes} × ${bOnes} = ${aOnes * bOnes}`);
  }

  return (
    <div className={styles.compactBreakdown}>
      <div className={styles.cbLabel}>Break it down:</div>
      {steps.map((step, i) => (
        <div key={i} className={styles.cbStep}>{step}</div>
      ))}
      <div className={styles.cbTotal}>
        Total = {steps.map((s) => s.split(' = ')[1]).join(' + ')} = {answer}
      </div>
    </div>
  );
}

export default function ArrayHelp({ a, b, operator, onClose }) {
  const isMultiplication = operator === '×';
  const isLarge = a > MAX_VISUAL || b > MAX_VISUAL;

  const steps = useMemo(() => {
    if (!isMultiplication) return [];

    const answer = a * b;

    return [
      {
        label: `What does ${a} × ${b} mean?`,
        description: `${a} groups of ${b} — imagine ${a} rows with ${b} dots in each row.`,
      },
      {
        label: `Visual: The Array`,
        showArray: true,
        showRepeatedAdd: !isLarge,
        showCompact: isLarge,
      },
      {
        label: 'The Answer',
        description: '',
        showFinal: true,
        finalEquation: `${a} × ${b} = ${answer}`,
      },
    ];
  }, [a, b, isMultiplication, isLarge]);

  if (!isMultiplication) {
    return (
      <div className={styles.overlay} data-testid="array-help">
        <button
          className={styles.closeBtn}
          onClick={onClose}
          data-testid="array-help-close"
          aria-label="Close help"
        >
          ✕
        </button>
        <h3 className={styles.title}>Array Method</h3>
        <div className={styles.notApplicable}>
          The Array Method works for multiplication problems.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} data-testid="array-help">
      <button
        className={styles.closeBtn}
        onClick={onClose}
        data-testid="array-help-close"
        aria-label="Close help"
      >
        ✕
      </button>

      <h3 className={styles.title}>Array Method</h3>

      <div className={styles.problemHeader}>
        {a} × {b} = ?
      </div>

      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepLabel}>{step.label}</div>

            {step.description && (
              <div className={styles.stepDescription}>{step.description}</div>
            )}

            {step.showArray && (
              <ArrayGrid columns={a} rows={b} totalCells={a * b} />
            )}

            {step.showRepeatedAdd && (
              <RepeatedAddition a={a} b={b} />
            )}

            {step.showCompact && (
              <CompactBreakdown a={a} b={b} />
            )}

            {step.showFinal && (
              <div className={styles.answerRow}>{step.finalEquation}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
