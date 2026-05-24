import { useCallback } from 'react';
import styles from './AudioButton.module.css';

export default function AudioButton({ text, disabled }) {
  const handleSpeak = useCallback(() => {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, [text]);

  return (
    <button
      className={styles.button}
      onClick={handleSpeak}
      disabled={disabled || !window.speechSynthesis}
      data-testid="audio-button"
    >
      🔊
    </button>
  );
}
