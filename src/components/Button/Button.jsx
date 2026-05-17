import styles from './Button.module.css';

function Button({ variant = 'primary', onClick, disabled, children, className, ...props }) {
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
