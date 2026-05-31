import { useCallback } from 'react';
import { useAppContext } from '../../services/AppContext';
import { ACTION_TYPES } from '../../services/appReducer';
import styles from './SettingsPage.module.css';

function SettingsPage() {
  const { state, dispatch, resetAll } = useAppContext();

  const handleDifficultyChange = useCallback(
    (e) => {
      dispatch({
        type: ACTION_TYPES.SET_DIFFICULTY,
        payload: Number(e.target.value),
      });
    },
    [dispatch]
  );

  const handleToggleSound = useCallback(() => {
    dispatch({ type: ACTION_TYPES.TOGGLE_SOUND });
  }, [dispatch]);

  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetAll();
    }
  }, [resetAll]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="difficulty">
          Difficulty Level
        </label>
        <select
          id="difficulty"
          className={styles.select}
          value={state.difficulty}
          onChange={handleDifficultyChange}
        >
          <option value={1}>Easy (1 digit)</option>
          <option value={2}>Easy+ (1 digit ±)</option>
          <option value={3}>Medium (2 digit +)</option>
          <option value={4}>Medium+ (2 digit ±)</option>
          <option value={5}>Hard (mixed)</option>
        </select>
      </div>

      <div className={styles.field}>
        <div className={styles.toggleRow}>
          <label className={styles.label} htmlFor="sound">
            Sound Effects
          </label>
          <input
            id="sound"
            type="checkbox"
            className={styles.toggle}
            checked={state.soundEnabled}
            onChange={handleToggleSound}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={handleReset}>
          Reset All Progress
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
