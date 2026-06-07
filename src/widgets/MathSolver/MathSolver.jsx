import { useState, useCallback } from 'react';
import ProblemDisplay from './ProblemDisplay';
import AnswerInput from './AnswerInput';
import FeedbackOverlay from './FeedbackOverlay';
import ScoreBar from './ScoreBar';
import Making10Help from './Making10Help';
import { useMathProblems } from '../../hooks/useMathProblems';
import styles from './MathSolver.module.css';

export default function MathSolver({
  difficulty = 1,
  count = 10,
  operation = 'addition',
  onAttempt,
  onChangeOperation,
}) {
  const {
    currentProblem,
    score,
    isComplete,
    feedback,
    submitAnswer,
    nextProblem,
    reset,
    report,
  } = useMathProblems({ difficulty, operation, count });

  const [inputValue, setInputValue] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleDigit = useCallback((digit) => {
    setInputValue((prev) => prev + digit);
  }, []);

  const handleBackspace = useCallback(() => {
    setInputValue((prev) => prev.slice(0, -1));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!inputValue) return;
    const result = submitAnswer(inputValue);
    if (result && onAttempt) {
      onAttempt(result);
    }
  }, [inputValue, submitAnswer, onAttempt]);

  const handleNext = useCallback(() => {
    setInputValue('');
    nextProblem();
  }, [nextProblem]);

  const handleReset = useCallback(() => {
    setInputValue('');
    reset();
  }, [reset]);

  if (isComplete) {
    const r = report();
    return (
      <div className={styles.container} data-testid="math-solver">
        <div className={styles.complete}>
          <div className={styles.completeEmoji}>🎉</div>
          <h2 className={styles.completeTitle}>All Done!</h2>
          <div className={styles.completeStats}>
            <div>Correct: {r.correct}</div>
            <div>Incorrect: {r.incorrect}</div>
            <div>Score: {r.percentage}%</div>
          </div>
          <div className={styles.completeButtons}>
            <button className={styles.resetBtn} onClick={handleReset}>
              Try Again
            </button>
            {onChangeOperation && (
              <button
                className={styles.changeOpBtn}
                onClick={onChangeOperation}
                data-testid="change-op-btn"
              >
                Change Operation
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!currentProblem) return null;

  return (
    <div className={styles.container} data-testid="math-solver">
      <button
        className={styles.helpBtn}
        onClick={() => setShowHelp(true)}
        data-testid="help-btn"
        aria-label="Help"
      >
        ?
      </button>

      <ScoreBar correct={score} total={count} />

      <ProblemDisplay
        a={currentProblem.a}
        b={currentProblem.b}
        operator={currentProblem.operator}
      />

      <AnswerInput
        value={inputValue}
        onDigit={handleDigit}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
        disabled={!!feedback}
      />

      {feedback && (
        <FeedbackOverlay
          correct={feedback.correct}
          correctAnswer={feedback.correctAnswer}
          onNext={handleNext}
        />
      )}

      {showHelp && (
        <Making10Help
          a={currentProblem.a}
          b={currentProblem.b}
          operator={currentProblem.operator}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}
