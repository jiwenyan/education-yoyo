import { generateProblem, generateProblems } from './mathProblems';

describe('generateProblem', () => {
  it('returns an object with correct shape', () => {
    const problem = generateProblem(1);
    expect(problem).toHaveProperty('a');
    expect(problem).toHaveProperty('b');
    expect(problem).toHaveProperty('operator');
    expect(problem).toHaveProperty('correctAnswer');
    expect(problem).toHaveProperty('difficulty');
  });

  it('generates addition problems for difficulty 1', () => {
    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(1);
      expect(problem.operator).toBe('+');
      expect(problem.a).toBeGreaterThanOrEqual(0);
      expect(problem.a).toBeLessThanOrEqual(9);
      expect(problem.b).toBeGreaterThanOrEqual(0);
      expect(problem.b).toBeLessThanOrEqual(9);
      expect(problem.correctAnswer).toBe(problem.a + problem.b);
    }
  });

  it('generates addition and subtraction for difficulty 2', () => {
    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(2);
      expect(['+', '-']).toContain(problem.operator);
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
    }
  });

  it('generates addition for difficulty 3 with two-digit numbers', () => {
    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(3);
      expect(problem.operator).toBe('+');
      expect(problem.a).toBeGreaterThanOrEqual(10);
      expect(problem.a).toBeLessThanOrEqual(99);
      expect(problem.b).toBeGreaterThanOrEqual(10);
      expect(problem.b).toBeLessThanOrEqual(99);
    }
  });

  it('generates addition and subtraction for difficulty 4', () => {
    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(4);
      expect(['+', '-']).toContain(problem.operator);
    }
  });

  it('generates mixed operations for difficulty 5', () => {
    for (let i = 0; i < 50; i++) {
      const problem = generateProblem(5);
      expect(['+', '-', '×']).toContain(problem.operator);
    }
  });

  it('clamps difficulty to valid range', () => {
    const high = generateProblem(10);
    expect(high.difficulty).toBe(5);

    const low = generateProblem(0);
    expect(low.difficulty).toBe(1);
  });

  it('computes correct answer correctly', () => {
    for (let i = 0; i < 100; i++) {
      const problem = generateProblem(5);
      let expected;
      switch (problem.operator) {
        case '+':
          expected = problem.a + problem.b;
          break;
        case '-':
          expected = problem.a - problem.b;
          break;
        case '×':
          expected = problem.a * problem.b;
          break;
      }
      expect(problem.correctAnswer).toBe(expected);
    }
  });
});

describe('generateProblems', () => {
  it('generates the requested number of problems', () => {
    const problems = generateProblems(5, 1);
    expect(problems).toHaveLength(5);
  });

  it('generates unique problems', () => {
    const problems = generateProblems(20, 1);
    const keys = problems.map((p) => `${p.a}${p.operator}${p.b}`);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(20);
  });

  it('defaults to 10 problems', () => {
    const problems = generateProblems();
    expect(problems).toHaveLength(10);
  });

  it('each problem has the same difficulty', () => {
    const problems = generateProblems(10, 3);
    problems.forEach((p) => expect(p.difficulty).toBe(3));
  });
});
