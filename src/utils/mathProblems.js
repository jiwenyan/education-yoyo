import { randInt } from './random';
import { generateMultiplicationByGrade } from './multiplicationTables';

const OPERATORS = ['+', '-', '×', '÷'];

/**
 * Normalizes the opts parameter for backward compatibility.
 * If opts is a number (or null/undefined), treat it as difficulty.
 * If opts is an object, extract { difficulty, operation }.
 */
function normalizeOpts(opts) {
  if (typeof opts === 'number' || opts === undefined || opts === null) {
    return { difficulty: opts ?? 1, operation: null };
  }
  return { difficulty: opts.difficulty ?? 1, operation: opts.operation ?? null };
}

/**
 * Generates a single math problem.
 *
 * @param {number|object} opts - Either a difficulty number (1-5) for backward compat,
 *   or an object { difficulty, operation }.
 * @param {number} [opts.difficulty=1] - Difficulty level 1-5.
 * @param {string} [opts.operation] - Specific operation: 'addition', 'subtraction',
 *   'multiplication', 'division'. If null, behaves like the old random pick.
 */
export function generateProblem(opts = 1) {
  const { difficulty: rawDifficulty, operation } = normalizeOpts(opts);
  const clampedDifficulty = Math.max(1, Math.min(5, rawDifficulty));

  let a, b, operator;

  if (operation) {
    operator = OPERATOR_SYMBOLS[operation];
    if (!operator) {
      // Fallback for unknown operation
      a = randInt(2, 9);
      b = randInt(10 - a, 9);
      operator = '+';
    } else {
      const result = generateForOperation(operation, clampedDifficulty);
      a = result.a;
      b = result.b;
    }
  } else {
    // Backward compat: pick operator the old way
    operator = pickOperator(clampedDifficulty);
    const result = generateForOldCompat(operator, clampedDifficulty);
    a = result.a;
    b = result.b;
  }

  const correctAnswer = computeAnswer(a, b, operator);
  return { a, b, operator, correctAnswer, difficulty: clampedDifficulty };
}

const OPERATOR_SYMBOLS = {
  addition: '+',
  subtraction: '-',
  multiplication: '×',
  division: '÷',
};

/**
 * Generates { a, b } for a specific operation at a given difficulty.
 */
function generateForOperation(operation, difficulty) {
  switch (operation) {
    case 'addition':
      return generateAddition(difficulty);
    case 'subtraction':
      return generateSubtraction(difficulty);
    case 'multiplication':
      return generateMultiplication(difficulty);
    case 'division':
      return generateDivision(difficulty);
    default:
      return generateAddition(difficulty);
  }
}

/**
 * Generates an addition problem.
 * Difficulty 1-2: single-digit, result 10-18
 * Difficulty 3-4: two-digit + two-digit
 * Difficulty 5: three-digit + three-digit
 */
function generateAddition(difficulty) {
  let a, b;
  if (difficulty <= 2) {
    a = randInt(2, 9);
    b = randInt(10 - a, 9);
  } else if (difficulty <= 4) {
    a = randInt(10, 99);
    b = randInt(10, 99);
  } else {
    a = randInt(100, 999);
    b = randInt(100, 999);
  }
  return { a, b };
}

/**
 * Generates a subtraction problem (non-negative result).
 * Difficulty 1-2: single-digit
 * Difficulty 3-4: two-digit
 * Difficulty 5: three-digit
 */
function generateSubtraction(difficulty) {
  let a, b;
  if (difficulty <= 2) {
    a = randInt(11, 15);
    b = randInt(1, Math.min(10, a));
  } else {
    a = randInt(11, 20);
    b = randInt(1, Math.min(15, a));
  }
  return { a, b };
}

/**
 * Generates a multiplication problem.
 * Diff 1: 2-5 × 2-5
 * Diff 2: 2-9 × 2-9
 * Diff 3: 2-12 × 2-12
 * Diff 4: 10-99 × 2-9
 * Diff 5: 10-99 × 10-99
 */
function generateMultiplication(difficulty) {
  let a, b;
  switch (difficulty) {
    case 1:
      a = randInt(2, 5);
      b = randInt(2, 5);
      break;
    case 2:
      a = randInt(2, 9);
      b = randInt(2, 9);
      break;
    case 3:
      a = randInt(2, 12);
      b = randInt(2, 12);
      break;
    case 4:
      a = randInt(10, 99);
      b = randInt(2, 9);
      break;
    case 5:
      a = randInt(10, 99);
      b = randInt(10, 99);
      break;
    default:
      a = randInt(2, 5);
      b = randInt(2, 5);
  }
  return { a, b };
}

/**
 * Generates a division problem (integer quotient, no remainder).
 * Generate divisor (b) and quotient first, then compute a = b * quotient.
 * Diff 1: quotients 2-5
 * Diff 2: quotients 2-9
 * Diff 3: quotients 2-12
 * Diff 4: up to 99 ÷ single-digit
 * Diff 5: up to 99 ÷ 99
 */
function generateDivision(difficulty) {
  let b, quotient;
  switch (difficulty) {
    case 1:
      b = randInt(2, 5);
      quotient = randInt(2, 5);
      break;
    case 2:
      b = randInt(2, 9);
      quotient = randInt(2, 9);
      break;
    case 3:
      b = randInt(2, 12);
      quotient = randInt(2, 12);
      break;
    case 4:
      b = randInt(2, 9);
      quotient = randInt(2, 11);
      break;
    case 5:
      b = randInt(2, 99);
      quotient = randInt(2, Math.floor(99 / b));
      break;
    default:
      b = randInt(2, 5);
      quotient = randInt(2, 5);
  }
  // Ensure quotient is at least 2 for diff 5 when b is large
  if (quotient < 2) quotient = 2;
  const a = b * quotient;
  return { a, b };
}

/**
 * Legacy: generates { a, b } for the old random-operator approach.
 */
function generateForOldCompat(operator, difficulty) {
  switch (operator) {
    case '+':
      return generateAddition(difficulty);
    case '-':
      return generateSubtraction(difficulty);
    case '×':
      return generateMultiplication(difficulty);
    default:
      return generateAddition(difficulty);
  }
}

/**
 * Generates an array of unique math problems.
 *
 * @param {number} count - Number of problems to generate.
 * @param {number|object} difficultyOrOpts - Either a difficulty number or
 *   an options object { difficulty, operation }.
 */
export function generateProblems(count = 10, difficultyOrOpts = 1) {
  const problems = [];
  const seen = new Set();

  while (problems.length < count) {
    const problem = generateProblem(difficultyOrOpts);
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
  // For difficulty 2: + or -; for 4: + or -; for 5: +, -, or ×
  if (difficulty === 5) {
    const pick = randInt(0, 2);
    if (pick === 0) return '+';
    if (pick === 1) return '-';
    return '×';
  }
  return randInt(0, 1) === 0 ? '+' : '-';
}

/**
 * Generates grade-based multiplication problems.
 * Delegates to multiplicationTables.generateMultiplicationByGrade().
 *
 * @param {number} grade - Grade level (2-5).
 * @param {number} count - Number of problems to generate.
 */
export function generateGradeBasedMultiplication(grade, count) {
  return generateMultiplicationByGrade(grade, count);
}

function computeAnswer(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return a / b;
    default:
      return 0;
  }
}
