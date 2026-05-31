import { render, screen, fireEvent } from '@testing-library/react';
import Making10Help from './Making10Help';

describe('Making10Help', () => {
  it('renders the title', () => {
    render(<Making10Help a={8} b={5} operator="+" onClose={() => {}} />);
    expect(screen.getByText('Making 10 Strategy')).toBeInTheDocument();
  });

  it('shows decomposition for making 10', () => {
    render(<Making10Help a={8} b={5} operator="+" onClose={() => {}} />);
    // For 8 + 5: need 2 to make 10, split 5 into 2 + 3
    expect(screen.getByText(/8 needs 2 more/)).toBeInTheDocument();
    expect(screen.getByText(/5.*2.*3/)).toBeInTheDocument();
  });

  it('shows the final answer', () => {
    render(<Making10Help a={8} b={5} operator="+" onClose={() => {}} />);
    expect(screen.getByText('8 + 5 = 13')).toBeInTheDocument();
  });

  it('shows "not applicable" for non-addition operators', () => {
    render(<Making10Help a={8} b={5} operator="-" onClose={() => {}} />);
    expect(
      screen.getByText(/works best for addition problems/)
    ).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Making10Help a={8} b={5} operator="+" onClose={onClose} />);
    fireEvent.click(screen.getByTestId('making-10-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('works when a is already 10', () => {
    render(<Making10Help a={10} b={3} operator="+" onClose={() => {}} />);
    // When a=10, the final answer should still be shown
    const answerElements = screen.getAllByText('10 + 3 = 13');
    expect(answerElements.length).toBeGreaterThanOrEqual(1);
  });

  it('works when a is greater than 10', () => {
    render(<Making10Help a={12} b={4} operator="+" onClose={() => {}} />);
    // When a>10, need is capped at 0, remainder=b
    expect(screen.getByText('12 + 4 = 16')).toBeInTheDocument();
  });

  it('renders ten frames via data-testid of the overlay', () => {
    render(<Making10Help a={6} b={7} operator="+" onClose={() => {}} />);
    expect(screen.getByTestId('making-10-help')).toBeInTheDocument();
  });
});
