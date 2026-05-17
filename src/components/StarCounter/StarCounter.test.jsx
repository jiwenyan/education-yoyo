import { render, screen } from '@testing-library/react';
import StarCounter from './StarCounter';

describe('StarCounter', () => {
  it('renders the count number', () => {
    render(<StarCounter count={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders zero by default', () => {
    render(<StarCounter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders the star icon', () => {
    render(<StarCounter count={5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'star');
  });
});
