import { render, screen, fireEvent } from '@testing-library/react';
import SubjectCard from './SubjectCard';

describe('SubjectCard', () => {
  const defaultProps = {
    title: 'Math',
    description: 'Practice math skills',
    icon: 'math',
    color: '#4a90d9',
    onStart: vi.fn(),
  };

  it('renders title and description', () => {
    render(<SubjectCard {...defaultProps} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Practice math skills')).toBeInTheDocument();
  });

  it('renders the icon (as aria-label)', () => {
    render(<SubjectCard {...defaultProps} />);
    expect(screen.getByRole('img', { name: 'math' })).toBeInTheDocument();
  });

  it('renders the Start Learning button', () => {
    render(<SubjectCard {...defaultProps} />);
    expect(screen.getByText('Start Learning')).toBeInTheDocument();
  });

  it('fires onStart when button is clicked', () => {
    const onStart = vi.fn();
    render(<SubjectCard {...defaultProps} onStart={onStart} />);
    fireEvent.click(screen.getByText('Start Learning'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('renders progress when provided', () => {
    render(<SubjectCard {...defaultProps} progress={60} />);
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('renders stars when provided', () => {
    render(<SubjectCard {...defaultProps} stars={3} />);
    const starsElement = screen.getByText('★★★☆☆');
    expect(starsElement).toBeInTheDocument();
  });

  it('does not render progress stat when not provided', () => {
    render(<SubjectCard {...defaultProps} />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });
});
