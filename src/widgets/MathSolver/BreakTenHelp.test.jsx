import { render, screen, fireEvent } from '@testing-library/react';
import BreakTenHelp from './BreakTenHelp';

describe('BreakTenHelp', () => {
  it('renders the title', () => {
    render(<BreakTenHelp a={14} b={8} operator="-" onClose={() => {}} />);
    expect(screen.getByText('Break-Ten Strategy')).toBeInTheDocument();
  });

  it('shows the problem header', () => {
    render(<BreakTenHelp a={14} b={8} operator="-" onClose={() => {}} />);
    expect(screen.getByText('14 − 8 = ?')).toBeInTheDocument();
  });

  it('shows break-ten steps when b > ones digit', () => {
    render(<BreakTenHelp a={14} b={8} operator="-" onClose={() => {}} />);
    // 14 has 4 ones, so 8 > 4 means we need to break ten
    expect(screen.getByText(/How many to reach 10/)).toBeInTheDocument();
    expect(screen.getByText(/Subtract to reach 10/)).toBeInTheDocument();
    expect(screen.getByText(/Subtract the remaining/)).toBeInTheDocument();
  });

  it('shows direct subtraction when b <= ones digit', () => {
    render(<BreakTenHelp a={17} b={5} operator="-" onClose={() => {}} />);
    // 17 has 7 ones, 5 <= 7 so subtract directly
    expect(screen.getByText(/Subtract directly/)).toBeInTheDocument();
  });

  it('shows the final answer', () => {
    render(<BreakTenHelp a={14} b={8} operator="-" onClose={() => {}} />);
    expect(screen.getByText('14 − 8 = 6')).toBeInTheDocument();
  });

  it('shows "not applicable" for non-subtraction operators', () => {
    render(<BreakTenHelp a={5} b={3} operator="+" onClose={() => {}} />);
    expect(screen.getByText(/works for subtraction/)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<BreakTenHelp a={14} b={8} operator="-" onClose={handleClose} />);
    fireEvent.click(screen.getByTestId('break-ten-close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('shows decomposition hint for break-ten case', () => {
    render(<BreakTenHelp a={14} b={8} operator="-" onClose={() => {}} />);
    expect(screen.getByText(/Split up/)).toBeInTheDocument();
  });

  it('renders ten frames via data-testid of the overlay', () => {
    render(<BreakTenHelp a={14} b={8} operator="-" onClose={() => {}} />);
    expect(screen.getByTestId('break-ten-help')).toBeInTheDocument();
  });
});
