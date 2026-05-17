import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>content</p></Card>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders Card.Header', () => {
    render(
      <Card>
        <Card.Header>Title</Card.Header>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders Card.Body', () => {
    render(
      <Card>
        <Card.Body>Body text</Card.Body>
      </Card>
    );
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders Card.Footer', () => {
    render(
      <Card>
        <Card.Footer>Actions</Card.Footer>
      </Card>
    );
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders all sub-components together', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
