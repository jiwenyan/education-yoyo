import styles from './ProgressRing.module.css';

const SIZE_MAP = {
  sm: 'sizeSm',
  md: 'sizeMd',
  lg: 'sizeLg',
  xl: 'sizeXl',
};

function ProgressRing({ value = 0, max = 100, size = 80, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(value, max));
  const offset = circumference - (clamped / max) * circumference;
  const percentage = max > 0 ? Math.round((clamped / max) * 100) : 0;

  const sizeKey =
    size <= 60 ? 'sm'
    : size <= 80 ? 'md'
    : size <= 100 ? 'lg'
    : 'xl';
  const containerClass = [styles.container, styles[SIZE_MAP[sizeKey]]].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <svg width={size} height={size} aria-label={`${percentage}% complete`}>
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.fill}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={styles.label}>{percentage}%</span>
    </div>
  );
}

export default ProgressRing;
