import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { appReducer, initialState } from './appReducer';
import { loadState, saveState } from './storage';

const STORAGE_KEY = 'state';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const saved = loadState(STORAGE_KEY);
  const [state, dispatch] = useReducer(appReducer, saved || initialState);

  useEffect(() => {
    saveState(STORAGE_KEY, state);
  }, [state]);

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, resetAll }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
