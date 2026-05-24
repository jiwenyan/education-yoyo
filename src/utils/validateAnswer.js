/**
 * Validates a user's answer against a problem.
 *
 * Accepts string or number input. Returns an object with:
 *   - correct: boolean
 *   - correctAnswer: the correct numeric answer
 */
export function validateAnswer(userAnswer, problem) {
  if (userAnswer == null || problem == null || problem.correctAnswer == null) {
    return { correct: false, correctAnswer: problem?.correctAnswer ?? null };
  }

  const parsed = typeof userAnswer === 'string' ? parseFloat(userAnswer) : userAnswer;

  if (Number.isNaN(parsed)) {
    return { correct: false, correctAnswer: problem.correctAnswer };
  }

  return {
    correct: parsed === problem.correctAnswer,
    correctAnswer: problem.correctAnswer,
  };
}
