import styles from './Icon.module.css';

const ICONS = {
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  math: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3h2v2h-2V6zm0 4h2v6h-2v-6zm-4 0h2v6H8v-6zm8 0h2v6h-2v-6z" />
    </svg>
  ),
  abc: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.75 3h-1.5L6 14h2l.75-2h6.5l.75 2h2L12.75 3zm-3.25 7l1.75-4.66L13 10H9.5zM21 17.5c0-.83-.67-1.5-1.5-1.5H15v2h4.5v.5H17v2h2.5v.5H15v2h4.5c.83 0 1.5-.67 1.5-1.5v-3.5zM3 19h4.5v2H3v-2z" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
  ),
};

function Icon({ name, size = 24, className, ...props }) {
  const svg = ICONS[name];

  if (!svg) {
    return null;
  }

  const sizeClass =
    size <= 16 ? styles.sizeSm
    : size <= 24 ? styles.sizeMd
    : size <= 32 ? styles.sizeLg
    : styles.sizeXl;

  const classNames = [styles.icon, sizeClass, className].filter(Boolean).join(' ');

  return (
    <span
      className={classNames}
      role="img"
      aria-label={name}
      {...props}
    >
      {svg}
    </span>
  );
}

export default Icon;
