import { useMemo } from 'react';
import Navigation from '../Navigation/Navigation';
import StarCounter from '../StarCounter/StarCounter';
import { useAppContext } from '../../services/AppContext';
import styles from './Header.module.css';

const navItems = [
  { label: 'Catalog', path: '/', icon: 'star' },
  { label: 'Math', path: '/math', icon: 'math' },
  { label: 'English', path: '/english', icon: 'abc' },
  { label: 'Progress', path: '/progress', icon: 'progress' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];

function Header() {
  const { state } = useAppContext();

  const totalStars = useMemo(() => {
    const { mathStats, alphabetProgress } = state;
    const mathStars = Math.floor(mathStats.totalCorrect / 2);
    const englishStars = Math.floor(alphabetProgress.length / 5);
    return mathStars + englishStars;
  }, [state]);

  return (
    <header className={styles.header}>
      <span className={styles.brand}>MathApp</span>
      <Navigation items={navItems} />
      <StarCounter count={totalStars} />
    </header>
  );
}

export default Header;
