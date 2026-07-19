import { useState, useCallback } from 'react';
import { useAppContext } from '../../services/AppContext';
import { ACTION_TYPES } from '../../services/appReducer';
import MathSolver from '../../widgets/MathSolver/MathSolver';
import OperationSelector from '../../widgets/OperationSelector/OperationSelector';
import GradeSelector from '../../widgets/GradeSelector/GradeSelector';
import styles from './MathPage.module.css';

function MathPage() {
  const { state, dispatch } = useAppContext();
  const [operation, setOperation] = useState(null);
  const [grade, setGrade] = useState(null);

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
    setGrade(null);
  }, []);

  const handleSelectGrade = useCallback((g) => {
    setGrade(g);
  }, []);

  const handleChangeOperation = useCallback(() => {
    setOperation(null);
    setGrade(null);
  }, []);

  const handleGradeBack = useCallback(() => {
    setGrade(null);
    setOperation(null);
  }, []);

  const showGradeSelector = operation === 'multiplication' && grade === null;
  const showMathSolver = operation && (operation !== 'multiplication' || grade !== null);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Math Practice</h1>
      <div className={styles.wrapper}>
        {showMathSolver ? (
          <MathSolver
            difficulty={state.difficulty}
            count={10}
            operation={operation}
            grade={grade}
            onAttempt={handleAttempt}
            onChangeOperation={handleChangeOperation}
          />
        ) : showGradeSelector ? (
          <GradeSelector
            onSelect={handleSelectGrade}
            onBack={handleGradeBack}
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
