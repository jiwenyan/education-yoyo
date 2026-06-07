import { useState, useCallback } from 'react';
import { useAppContext } from '../../services/AppContext';
import { ACTION_TYPES } from '../../services/appReducer';
import MathSolver from '../../widgets/MathSolver/MathSolver';
import OperationSelector from '../../widgets/OperationSelector/OperationSelector';
import styles from './MathPage.module.css';

function MathPage() {
  const { state, dispatch } = useAppContext();
  const [operation, setOperation] = useState(null);

  const handleAttempt = useCallback(
    (result) => {
      dispatch({
        type: ACTION_TYPES.RECORD_MATH_ATTEMPT,
        payload: { correct: result.correct },
      });
    },
    [dispatch]
  );

  const handleSelectOperation = useCallback((op) => {
    setOperation(op);
  }, []);

  const handleChangeOperation = useCallback(() => {
    setOperation(null);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Math Practice</h1>
      <div className={styles.wrapper}>
        {operation ? (
          <MathSolver
            difficulty={state.difficulty}
            count={10}
            operation={operation}
            onAttempt={handleAttempt}
            onChangeOperation={handleChangeOperation}
          />
        ) : (
          <OperationSelector
            onSelect={handleSelectOperation}
            currentOperation={null}
          />
        )}
      </div>
    </div>
  );
}

export default MathPage;
