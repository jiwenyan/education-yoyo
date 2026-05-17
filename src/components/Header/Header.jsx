import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.brand}>MathApp</span>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} end>Catalog</NavLink>
        <NavLink to="/math" className={({ isActive }) => isActive ? styles.active : undefined}>Math</NavLink>
        <NavLink to="/english" className={({ isActive }) => isActive ? styles.active : undefined}>English</NavLink>
        <NavLink to="/progress" className={({ isActive }) => isActive ? styles.active : undefined}>Progress</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? styles.active : undefined}>Settings</NavLink>
      </nav>
    </header>
  );
}

export default Header;
