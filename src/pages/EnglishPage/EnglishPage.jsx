import { useCallback } from 'react';
import { useAppContext } from '../../services/AppContext';
import { ACTION_TYPES } from '../../services/appReducer';
import AlphabetTracer from '../../widgets/AlphabetTracer/AlphabetTracer';
import styles from './EnglishPage.module.css';

function EnglishPage() {
  const { dispatch } = useAppContext();

  const handleLetterComplete = useCallback(
    (letter) => {
      dispatch({
        type: ACTION_TYPES.MARK_LETTER_COMPLETE,
        payload: letter,
      });
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Alphabet Tracing</h1>
      <AlphabetTracer onLetterComplete={handleLetterComplete} />
    </div>
  );
}

export default EnglishPage;
