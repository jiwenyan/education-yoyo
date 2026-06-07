import styles from './OperationSelector.module.css';

const OPERATIONS = [
  { id: 'addition', symbol: '+', label: 'Addition', color: '#4a90d9' },
  { id: 'subtraction', symbol: '−', label: 'Subtraction', color: '#e67e22' },
  { id: 'multiplication', symbol: '×', label: 'Multiplication', color: '#27ae60' },
  { id: 'division', symbol: '÷', label: 'Division', color: '#e74c3c' },
];

export default function OperationSelector({ onSelect, currentOperation }) {
  return (
    <div className={styles.grid} data-testid="operation-selector">
      {OPERATIONS.map((op) => (
        <button
          key={op.id}
          className={`${styles.btn} ${currentOperation === op.id ? styles.selected : ''}`}
          style={{
            '--btn-color': op.color,
            borderColor: currentOperation === op.id ? op.color : '#ddd',
          }}
          onClick={() => onSelect(op.id)}
          data-testid={`operation-btn-${op.id}`}
          aria-label={`Practice ${op.label}`}
        >
          <span className={styles.symbol}>{op.symbol}</span>
          <span className={styles.label}>{op.label}</span>
        </button>
      ))}
    </div>
  );
}
