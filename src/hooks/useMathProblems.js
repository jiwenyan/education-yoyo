import { useState, useCallback, useRef } from 'react';
import { generateProblems } from '../utils/mathProblems';
import { validateAnswer } from '../utils/validateAnswer';

export function useMathProblems(difficulty = 1, count = 10) {
  // Support both old positional args and new options object
  const opts = typeof difficulty === 'object' && difficulty !== null
    ? difficulty
    : { difficulty, count };
  const { difficulty: diff, operation, count: cnt } = opts;
  const resolvedDifficulty = diff ?? 1;
  const resolvedCount = cnt ?? count;
  const resolvedOperation = operation ?? null;

  const generateOpts = resolvedOperation
    ? { difficulty: resolvedDifficulty, operation: resolvedOperation }
    : resolvedDifficulty;

  const [problems, setProblems] = useState(
    () => generateProblems(resolvedCount, generateOpts)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const scoreRef = useRef(0);

  const currentProblem = problems[currentIndex] || null;

  const submitAnswer = useCallback(
    (userAnswer) => {
      if (!currentProblem || isComplete) return null;

      const result = validateAnswer(userAnswer, currentProblem);

      if (result.correct) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      setFeedback({
        correct: result.correct,
        correctAnswer: result.correctAnswer,
      });

      return result;
    },
    [currentProblem, isComplete]
  );

  const nextProblem = useCallback(() => {
    const nextIndex = currentIndex + 1;
    setFeedback(null);

    if (nextIndex >= problems.length) {
      setIsComplete(true);
      return;
    }

    setCurrentIndex(nextIndex);
  }, [currentIndex, problems.length]);

  const reset = useCallback(() => {
    setProblems(generateProblems(resolvedCount, generateOpts));
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setFeedback(null);
    scoreRef.current = 0;
  }, [resolvedCount, resolvedDifficulty, resolvedOperation]);

  const report = useCallback(() => {
    return {
      total: problems.length,
      correct: scoreRef.current,
      incorrect: problems.length - scoreRef.current,
      percentage: problems.length > 0
        ? Math.round((scoreRef.current / problems.length) * 100)
        : 0,
    };
  }, [problems.length]);

  return {
    currentProblem,
    currentIndex,
    totalProblems: problems.length,
    score,
    isComplete,
    feedback,
    submitAnswer,
    nextProblem,
    reset,
    report,
  };
}
