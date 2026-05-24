import { validateAnswer } from './validateAnswer';

describe('validateAnswer', () => {
  it('returns correct=true for a correct answer', () => {
    const problem = { a: 3, b: 5, operator: '+', correctAnswer: 8 };
    expect(validateAnswer(8, problem)).toEqual({ correct: true, correctAnswer: 8 });
  });

  it('returns correct=false for an incorrect answer', () => {
    const problem = { a: 3, b: 5, operator: '+', correctAnswer: 8 };
    expect(validateAnswer(7, problem)).toEqual({ correct: false, correctAnswer: 8 });
  });

  it('accepts string input', () => {
    const problem = { a: 10, b: 5, operator: '-', correctAnswer: 5 };
    expect(validateAnswer('5', problem)).toEqual({ correct: true, correctAnswer: 5 });
  });

  it('returns correct=false for non-numeric strings', () => {
    const problem = { a: 3, b: 5, operator: '+', correctAnswer: 8 };
    expect(validateAnswer('abc', problem)).toEqual({ correct: false, correctAnswer: 8 });
  });

  it('returns correct=false for null userAnswer', () => {
    const problem = { a: 3, b: 5, operator: '+', correctAnswer: 8 };
    expect(validateAnswer(null, problem)).toEqual({ correct: false, correctAnswer: 8 });
  });

  it('returns correct=false for undefined userAnswer', () => {
    const problem = { a: 3, b: 5, operator: '+', correctAnswer: 8 };
    expect(validateAnswer(undefined, problem)).toEqual({ correct: false, correctAnswer: 8 });
  });

  it('handles null problem gracefully', () => {
    expect(validateAnswer(5, null)).toEqual({ correct: false, correctAnswer: null });
  });

  it('handles subtraction problems', () => {
    const problem = { a: 10, b: 3, operator: '-', correctAnswer: 7 };
    expect(validateAnswer(7, problem)).toEqual({ correct: true, correctAnswer: 7 });
    expect(validateAnswer(4, problem)).toEqual({ correct: false, correctAnswer: 7 });
  });

  it('handles multiplication problems', () => {
    const problem = { a: 6, b: 7, operator: '×', correctAnswer: 42 };
    expect(validateAnswer(42, problem)).toEqual({ correct: true, correctAnswer: 42 });
  });
});
