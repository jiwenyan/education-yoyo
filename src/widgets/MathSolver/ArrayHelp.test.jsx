import { render, screen, fireEvent } from '@testing-library/react';
import ArrayHelp from './ArrayHelp';

describe('ArrayHelp', () => {
  it('renders the title', () => {
    render(<ArrayHelp a={4} b={3} operator="×" onClose={() => {}} />);
    expect(screen.getByText('Array Method')).toBeInTheDocument();
  });

  it('shows the problem header', () => {
    render(<ArrayHelp a={4} b={3} operator="×" onClose={() => {}} />);
    expect(screen.getByText('4 × 3 = ?')).toBeInTheDocument();
  });

  it('shows the meaning step', () => {
    render(<ArrayHelp a={4} b={3} operator="×" onClose={() => {}} />);
    expect(screen.getByText('What does 4 × 3 mean?')).toBeInTheDocument();
    expect(screen.getByText(/4 groups of 3/)).toBeInTheDocument();
  });

  it('shows the repeated addition for small numbers', () => {
    render(<ArrayHelp a={3} b={5} operator="×" onClose={() => {}} />);
    // 3 groups of 5: 5 + 5 + 5 = 15
    expect(screen.getByText('5 + 5 + 5 = 15')).toBeInTheDocument();
  });

  it('shows the final answer', () => {
    render(<ArrayHelp a={4} b={3} operator="×" onClose={() => {}} />);
    expect(screen.getByText('4 × 3 = 12')).toBeInTheDocument();
  });

  it('shows compact breakdown for large numbers', () => {
    render(<ArrayHelp a={23} b={45} operator="×" onClose={() => {}} />);
    expect(screen.getByText('Break it down:')).toBeInTheDocument();
    expect(screen.getByText('Array Method')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<ArrayHelp a={4} b={3} operator="×" onClose={onClose} />);
    fireEvent.click(screen.getByTestId('array-help-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows "not applicable" for non-multiplication operators', () => {
    render(<ArrayHelp a={4} b={3} operator="+" onClose={() => {}} />);
    expect(
      screen.getByText(/works for multiplication problems/)
    ).toBeInTheDocument();
  });

  it('renders the overlay via data-testid', () => {
    render(<ArrayHelp a={6} b={7} operator="×" onClose={() => {}} />);
    expect(screen.getByTestId('array-help')).toBeInTheDocument();
  });

  it('shows compact breakdown instead of repeated addition for large numbers', () => {
    render(<ArrayHelp a={25} b={3} operator="×" onClose={() => {}} />);
    // Large numbers use compact breakdown, not repeated addition
    expect(screen.getByText('Break it down:')).toBeInTheDocument();
  });
});
