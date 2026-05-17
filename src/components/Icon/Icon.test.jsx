import { render, screen } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
  it('renders an icon by name', () => {
    render(<Icon name="star" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'star');
  });

  it('renders with a custom size', () => {
    render(<Icon name="math" size={32} />);
    const el = screen.getByRole('img');
    expect(el).toHaveAttribute('aria-label', 'math');
  });

  it('returns null for unknown icon name', () => {
    const { container } = render(<Icon name="unknown" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all defined icons without error', () => {
    const names = ['star', 'math', 'abc', 'settings', 'progress'];
    names.forEach((name) => {
      const { unmount } = render(<Icon name={name} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
      unmount();
    });
  });
});
