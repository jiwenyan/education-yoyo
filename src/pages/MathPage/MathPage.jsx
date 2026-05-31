import { useCallback } from 'react';
import { useAppContext } from '../../services/AppContext';
import { ACTION_TYPES } from '../../services/appReducer';
import MathSolver from '../../widgets/MathSolver/MathSolver';
import styles from './MathPage.module.css';

function MathPage() {
  const { state, dispatch } = useAppContext();

  const handleAttempt = useCallback(
    (result) => {
      dispatch({
        type: ACTION_TYPES.RECORD_MATH_ATTEMPT,
        payload: { correct: result.correct },
      });
    },
    [dispatch]
  );

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Math Practice</h1>
      <div className={styles.wrapper}>
        <MathSolver
          difficulty={state.difficulty}
          count={10}
          onAttempt={handleAttempt}
        />
      </div>
    </div>
  );
}

export default MathPage;
