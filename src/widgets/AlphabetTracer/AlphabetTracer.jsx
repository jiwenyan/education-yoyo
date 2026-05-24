import { useState, useCallback, useMemo } from 'react';
import { alphabetData } from '../../utils/alphabetData';
import TracingCanvas from './TracingCanvas';
import LetterPrompt from './LetterPrompt';
import AudioButton from './AudioButton';
import styles from './AlphabetTracer.module.css';

export default function AlphabetTracer({ startLetter }) {
  const startIndex = useMemo(() => {
    const idx = alphabetData.findIndex((e) => e.letter === startLetter);
    return idx >= 0 ? idx : 0;
  }, [startLetter]);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [completedLetters, setCompletedLetters] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const current = alphabetData[currentIndex];

  const handleDrawEnd = useCallback(() => {
    const letter = current.letter;
    if (completedLetters.includes(letter)) return;

    const newCompleted = [...completedLetters, letter];
    setCompletedLetters(newCompleted);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= alphabetData.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, current, completedLetters]);

  const handleReset = useCallback(() => {
    setCurrentIndex(startIndex);
    setCompletedLetters([]);
    setIsComplete(false);
  }, [startIndex]);

  if (isComplete) {
    return (
      <div className={styles.container} data-testid="alphabet-tracer">
        <div className={styles.complete}>
          <div className={styles.completeEmoji}>🏆</div>
          <h2 className={styles.completeTitle}>Alphabet Complete!</h2>
          <div className={styles.completeStats}>
            You traced all 26 letters!
          </div>
          <button className={styles.resetBtn} onClick={handleReset}>
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid="alphabet-tracer">
      <div className={styles.header}>
        <span className={styles.progress}>
          Letter {currentIndex + 1} of {alphabetData.length}
        </span>
        <AudioButton text={`${current.letter} is for ${current.word}`} />
      </div>

      <LetterPrompt
        letter={current.letter}
        word={current.word}
        wordImage={current.wordImage}
      />

      <TracingCanvas onDrawEnd={handleDrawEnd} disabled={false} />
    </div>
  );
}
