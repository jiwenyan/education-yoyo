import { randInt } from './random';

const OPERATORS = ['+', '-', '×'];

/**
 * Generates a single math problem with a given difficulty (1-5).
 *
 * Difficulty 1: single-digit addition (0-9 + 0-9)
 * Difficulty 2: single-digit addition/subtraction (0-9 ± 0-9), result ≥ 0
 * Difficulty 3: two-digit addition (10-99 + 10-99)
 * Difficulty 4: two-digit addition/subtraction (10-99 ± 10-99), result ≥ 0
 * Difficulty 5: mixed operations, larger numbers (up to 999)
 */
export function generateProblem(difficulty = 1) {
  const clampedDifficulty = Math.max(1, Math.min(5, difficulty));
  let a, b, operator;

  switch (clampedDifficulty) {
    case 1:
      a = randInt(0, 9);
      b = randInt(0, 9);
      operator = '+';
      break;
    case 2:
      operator = pickOperator(clampedDifficulty);
      if (operator === '-') {
        a = randInt(0, 9);
        b = randInt(0, a); // ensure non-negative result
      } else {
        a = randInt(0, 9);
        b = randInt(0, 9);
      }
      break;
    case 3:
      a = randInt(10, 99);
      b = randInt(10, 99);
      operator = '+';
      break;
    case 4:
      operator = pickOperator(clampedDifficulty);
      if (operator === '-') {
        a = randInt(10, 99);
        b = randInt(10, a); // ensure non-negative result
      } else {
        a = randInt(10, 99);
        b = randInt(10, 99);
      }
      break;
    case 5:
      operator = pickOperator(clampedDifficulty);
      if (operator === '+') {
        a = randInt(100, 999);
        b = randInt(100, 999);
      } else if (operator === '-') {
        a = randInt(100, 999);
        b = randInt(100, a);
      } else {
        a = randInt(10, 99);
        b = randInt(2, 12);
      }
      break;
    default:
      a = randInt(0, 9);
      b = randInt(0, 9);
      operator = '+';
  }

  const correctAnswer = computeAnswer(a, b, operator);
  return { a, b, operator, correctAnswer, difficulty: clampedDifficulty };
}

/**
 * Generates an array of unique math problems.
 */
export function generateProblems(count = 10, difficulty = 1) {
  const problems = [];
  const seen = new Set();

  while (problems.length < count) {
    const problem = generateProblem(difficulty);
    const key = `${problem.a}${problem.operator}${problem.b}`;
    if (!seen.has(key)) {
      seen.add(key);
      problems.push(problem);
    }
  }

  return problems;
}

function pickOperator(difficulty) {
  if (difficulty <= 1 || difficulty === 3) return '+';
  return randInt(0, 1) === 0 ? '+' : '-';
}

function computeAnswer(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    default:
      return 0;
  }
}
