import { renderHook, act } from '@testing-library/react';
import { useMathProblems } from './useMathProblems';

describe('useMathProblems', () => {
  it('returns initial problem and zero score', () => {
    const { result } = renderHook(() => useMathProblems(1, 5));

    expect(result.current.currentProblem).toBeTruthy();
    expect(result.current.currentProblem).toHaveProperty('a');
    expect(result.current.currentProblem).toHaveProperty('b');
    expect(result.current.currentProblem).toHaveProperty('operator');
    expect(result.current.currentProblem).toHaveProperty('correctAnswer');
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalProblems).toBe(5);
    expect(result.current.score).toBe(0);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.feedback).toBeNull();
  });

  it('submitAnswer returns correct result and updates score', () => {
    const { result } = renderHook(() => useMathProblems(1, 5));
    const correctAnswer = result.current.currentProblem.correctAnswer;

    let submitResult;
    act(() => {
      submitResult = result.current.submitAnswer(correctAnswer);
    });

    expect(submitResult.correct).toBe(true);
    expect(result.current.feedback).toEqual({
      correct: true,
      correctAnswer,
    });
    expect(result.current.score).toBe(1);
  });

  it('submitAnswer returns incorrect result', () => {
    const { result } = renderHook(() => useMathProblems(1, 5));
    const wrongAnswer = result.current.currentProblem.correctAnswer + 1;

    let submitResult;
    act(() => {
      submitResult = result.current.submitAnswer(wrongAnswer);
    });

    expect(submitResult.correct).toBe(false);
    expect(result.current.score).toBe(0);
  });

  it('nextProblem advances to next problem', () => {
    const { result } = renderHook(() => useMathProblems(1, 3));

    expect(result.current.currentIndex).toBe(0);
    act(() => {
      result.current.nextProblem();
    });
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.feedback).toBeNull();
  });

  it('sets isComplete after all problems', () => {
    const { result } = renderHook(() => useMathProblems(1, 2));

    act(() => { result.current.nextProblem(); });
    expect(result.current.isComplete).toBe(false);
    act(() => { result.current.nextProblem(); });
    expect(result.current.isComplete).toBe(true);
  });

  it('submitAnswer returns null when complete', () => {
    const { result } = renderHook(() => useMathProblems(1, 1));

    act(() => { result.current.nextProblem(); });
    expect(result.current.isComplete).toBe(true);

    let submitResult;
    act(() => {
      submitResult = result.current.submitAnswer(5);
    });
    expect(submitResult).toBeNull();
  });

  it('reset restarts all state', () => {
    const { result } = renderHook(() => useMathProblems(1, 5));

    act(() => { result.current.submitAnswer(result.current.currentProblem.correctAnswer); });
    act(() => { result.current.nextProblem(); });
    expect(result.current.score).toBe(1);

    act(() => { result.current.reset(); });
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.feedback).toBeNull();
  });

  it('report returns correct stats', () => {
    const { result } = renderHook(() => useMathProblems(1, 5));

    act(() => { result.current.submitAnswer(result.current.currentProblem.correctAnswer); });
    act(() => { result.current.nextProblem(); });

    const r = result.current.report();
    expect(r.total).toBe(5);
    expect(r.correct).toBe(1);
    expect(r.incorrect).toBe(4);
    expect(r.percentage).toBe(20);
  });

  // --- New: operation support ---

  it('accepts options object with operation', () => {
    const { result } = renderHook(() => useMathProblems({ difficulty: 1, operation: 'division', count: 3 }));

    expect(result.current.currentProblem).toBeTruthy();
    expect(result.current.currentProblem.operator).toBe('÷');
    expect(result.current.currentProblem.a % result.current.currentProblem.b).toBe(0);
    expect(result.current.totalProblems).toBe(3);
  });

  it('still works with positional args for backward compat', () => {
    const { result } = renderHook(() => useMathProblems(1, 5));

    expect(result.current.currentProblem).toBeTruthy();
    expect(result.current.totalProblems).toBe(5);
  });
});
