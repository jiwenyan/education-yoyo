import { render, screen } from '@testing-library/react';
import ProgressRing from './ProgressRing';

describe('ProgressRing', () => {
  it('renders with default props', () => {
    render(<ProgressRing />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders the correct percentage text', () => {
    render(<ProgressRing value={75} max={100} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('clamps value to max', () => {
    render(<ProgressRing value={150} max={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('clamps value to 0', () => {
    render(<ProgressRing value={-10} max={100} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles custom size and strokeWidth', () => {
    const { container } = render(<ProgressRing value={50} size={100} strokeWidth={8} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });
});
