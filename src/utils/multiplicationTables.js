import { randInt, shuffle } from './random';

export const GRADE_TABLES = {
  2: {
    label: 'Grade 2',
    icon: '\u{1F522}',
    description: "I'm learning to multiply!",
    tables: [2, 5, 10],
    maxFactor: 12,
  },
  3: {
    label: 'Grade 3',
    icon: '\u{1F4D0}',
    description: 'I know some tables!',
    tables: [3, 4, 8, 11],
    reviewTables: [2, 5, 10],
    reviewChance: 0.3,
    maxFactor: 12,
  },
  4: {
    label: 'Grade 4',
    icon: '\u{1F680}',
    description: "I'm getting fast!",
    tables: [6, 7, 9, 12],
    reviewTables: [2, 3, 4, 5, 8, 10, 11],
    reviewChance: 0.4,
    maxFactor: 12,
  },
  5: {
    label: 'Grade 5+',
    icon: '\u{1F9E0}',
    description: "I'm a math whiz!",
    multiDigit: true,
  },
};

export function getGradeInfo(grade) {
  return GRADE_TABLES[grade] || null;
}

export function generateMultiplicationByGrade(grade, count) {
  const info = getGradeInfo(grade);
  if (!info) return [];

  const problems = [];
  const seen = new Set();
  let attempts = 0;
  const maxAttempts = count * 20;

  if (info.multiDigit) {
    // Grade 5+: multi-digit multiplication
    // First half of problems: (10-99) × (2-9)
    // Second half: (10-99) × (10-99)
    const midPoint = Math.floor(count / 2);

    while (problems.length < count && attempts < maxAttempts) {
      attempts++;
      let a, b;
      if (problems.length < midPoint) {
        a = randInt(10, 99);
        b = randInt(2, 9);
      } else {
        a = randInt(10, 99);
        b = randInt(10, 99);
      }
      const key = `${a}×${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        problems.push({ a, b, operator: '×', correctAnswer: a * b });
      }
    }
  } else {
    // Grade 2-4: multiplication tables
    while (problems.length < count && attempts < maxAttempts) {
      attempts++;
      const { table, factor } = pickTableForGrade(info);
      // Randomize which factor is the table to avoid always showing a×b in the same order
      const swap = Math.random() < 0.5;
      const a = swap ? factor : table;
      const b = swap ? table : factor;
      const key = `${a}×${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        problems.push({ a, b, operator: '×', correctAnswer: a * b });
      }
    }
  }

  // Shuffle for variety
  return shuffle(problems);
}

function pickTableForGrade(info) {
  const { tables, reviewTables, maxFactor } = info;

  // Decide whether this should be a review table (if any review tables defined)
  const doReview = reviewTables && reviewTables.length > 0 && Math.random() < (info.reviewChance || 0);

  const pickTable = doReview
    ? reviewTables[randInt(0, reviewTables.length - 1)]
    : tables[randInt(0, tables.length - 1)];

  const factor = randInt(1, maxFactor);

  return { table: pickTable, factor };
}
