import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './Navigation.module.css';

function Navigation({ items = [] }) {
  return (
    <nav className={styles.nav}>
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
          }
        >
          {item.icon && <Icon name={item.icon} size={16} />}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
