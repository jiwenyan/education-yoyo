import styles from './LetterPrompt.module.css';

export default function LetterPrompt({ letter, word, wordImage }) {
  return (
    <div className={styles.container} data-testid="letter-prompt">
      <div className={styles.letter}>{letter}</div>
      <div className={styles.word}>
        {letter} is for {word} {wordImage}
      </div>
    </div>
  );
}
