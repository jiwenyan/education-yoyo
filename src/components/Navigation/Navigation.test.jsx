import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

const items = [
  { label: 'Home', path: '/', icon: 'star' },
  { label: 'Math', path: '/math', icon: 'math' },
];

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Navigation', () => {
  it('renders all items', () => {
    renderWithRouter(<Navigation items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Math')).toBeInTheDocument();
  });

  it('renders icons for items with icon name', () => {
    renderWithRouter(<Navigation items={items} />);
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2);
  });

  it('renders empty nav when no items', () => {
    const { container } = renderWithRouter(<Navigation items={[]} />);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('creates links with correct paths', () => {
    renderWithRouter(<Navigation items={items} />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Math').closest('a')).toHaveAttribute('href', '/math');
  });
});
