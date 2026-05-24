import { appReducer, initialState, ACTION_TYPES } from './appReducer';

describe('appReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = appReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  describe('SET_THEME', () => {
    it('sets the theme', () => {
      const state = appReducer(initialState, {
        type: ACTION_TYPES.SET_THEME,
        payload: 'dark',
      });
      expect(state.theme).toBe('dark');
    });
  });

  describe('SET_DIFFICULTY', () => {
    it('sets the difficulty', () => {
      const state = appReducer(initialState, {
        type: ACTION_TYPES.SET_DIFFICULTY,
        payload: 3,
      });
      expect(state.difficulty).toBe(3);
    });
  });

  describe('TOGGLE_SOUND', () => {
    it('toggles sound from true to false', () => {
      const state = appReducer(initialState, {
        type: ACTION_TYPES.TOGGLE_SOUND,
      });
      expect(state.soundEnabled).toBe(false);
    });

    it('toggles sound from false to true', () => {
      const prev = { ...initialState, soundEnabled: false };
      const state = appReducer(prev, { type: ACTION_TYPES.TOGGLE_SOUND });
      expect(state.soundEnabled).toBe(true);
    });
  });

  describe('RECORD_MATH_ATTEMPT', () => {
    it('increments totalAttempted', () => {
      const state = appReducer(initialState, {
        type: ACTION_TYPES.RECORD_MATH_ATTEMPT,
        payload: { correct: true },
      });
      expect(state.mathStats.totalAttempted).toBe(1);
      expect(state.mathStats.totalCorrect).toBe(1);
    });

    it('does not increment totalCorrect when incorrect', () => {
      const state = appReducer(initialState, {
        type: ACTION_TYPES.RECORD_MATH_ATTEMPT,
        payload: { correct: false },
      });
      expect(state.mathStats.totalAttempted).toBe(1);
      expect(state.mathStats.totalCorrect).toBe(0);
    });
  });

  describe('MARK_LETTER_COMPLETE', () => {
    it('adds letter to alphabetProgress', () => {
      const state = appReducer(initialState, {
        type: ACTION_TYPES.MARK_LETTER_COMPLETE,
        payload: 'A',
      });
      expect(state.alphabetProgress).toEqual(['A']);
    });

    it('does not duplicate letters', () => {
      let state = appReducer(initialState, {
        type: ACTION_TYPES.MARK_LETTER_COMPLETE,
        payload: 'A',
      });
      state = appReducer(state, {
        type: ACTION_TYPES.MARK_LETTER_COMPLETE,
        payload: 'A',
      });
      expect(state.alphabetProgress).toEqual(['A']);
    });
  });

  describe('RESET_ALL', () => {
    it('resets mathStats and alphabetProgress while preserving settings', () => {
      const modified = {
        ...initialState,
        theme: 'dark',
        difficulty: 5,
        mathStats: { totalAttempted: 10, totalCorrect: 8 },
        alphabetProgress: ['A', 'B', 'C'],
      };

      const state = appReducer(modified, { type: ACTION_TYPES.RESET_ALL });

      expect(state.theme).toBe('dark');
      expect(state.difficulty).toBe(5);
      expect(state.soundEnabled).toBe(true);
      expect(state.mathStats).toEqual({ totalAttempted: 0, totalCorrect: 0 });
      expect(state.alphabetProgress).toEqual([]);
    });
  });
});
