export const initialState = {
  theme: 'light',
  difficulty: 1,
  soundEnabled: true,
  mathStats: { totalAttempted: 0, totalCorrect: 0 },
  alphabetProgress: [],
};

export const ACTION_TYPES = {
  SET_THEME: 'SET_THEME',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  TOGGLE_SOUND: 'TOGGLE_SOUND',
  RECORD_MATH_ATTEMPT: 'RECORD_MATH_ATTEMPT',
  MARK_LETTER_COMPLETE: 'MARK_LETTER_COMPLETE',
  RESET_ALL: 'RESET_ALL',
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_THEME:
      return { ...state, theme: action.payload };

    case ACTION_TYPES.SET_DIFFICULTY:
      return { ...state, difficulty: action.payload };

    case ACTION_TYPES.TOGGLE_SOUND:
      return { ...state, soundEnabled: !state.soundEnabled };

    case ACTION_TYPES.RECORD_MATH_ATTEMPT: {
      const updated = { ...state.mathStats };
      updated.totalAttempted += 1;
      if (action.payload.correct) {
        updated.totalCorrect += 1;
      }
      return { ...state, mathStats: updated };
    }

    case ACTION_TYPES.MARK_LETTER_COMPLETE: {
      const letter = action.payload;
      if (state.alphabetProgress.includes(letter)) {
        return state;
      }
      return {
        ...state,
        alphabetProgress: [...state.alphabetProgress, letter],
      };
    }

    case ACTION_TYPES.RESET_ALL:
      return {
        ...initialState,
        theme: state.theme,
        difficulty: state.difficulty,
        soundEnabled: state.soundEnabled,
      };

    default:
      return state;
  }
}
