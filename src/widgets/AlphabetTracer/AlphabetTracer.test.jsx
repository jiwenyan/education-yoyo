import { render, screen, fireEvent } from '@testing-library/react';
import AlphabetTracer from './AlphabetTracer';

describe('AlphabetTracer', () => {
  it('renders the first letter (A) by default', () => {
    render(<AlphabetTracer />);
    expect(screen.getByTestId('alphabet-tracer')).toBeInTheDocument();
    expect(screen.getByTestId('letter-prompt')).toBeInTheDocument();
    expect(screen.getByTestId('tracing-canvas')).toBeInTheDocument();
  });

  it('renders a specific start letter', () => {
    render(<AlphabetTracer startLetter="M" />);
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText(/M is for Moon/)).toBeInTheDocument();
  });

  it('shows progress text', () => {
    render(<AlphabetTracer startLetter="C" />);
    expect(screen.getByText('Letter 3 of 26')).toBeInTheDocument();
  });

  it('renders the audio button', () => {
    render(<AlphabetTracer />);
    expect(screen.getByTestId('audio-button')).toBeInTheDocument();
  });

  it('shows word association', () => {
    render(<AlphabetTracer startLetter="A" />);
    expect(screen.getByText(/A is for Apple/)).toBeInTheDocument();
  });

  it('falls back to A for unknown startLetter', () => {
    render(<AlphabetTracer startLetter="1" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('shows complete screen after all 26 letters (simulated draw)', () => {
    render(<AlphabetTracer startLetter="Z" />);
    expect(screen.getByText('Letter 26 of 26')).toBeInTheDocument();
    expect(screen.queryByText('Alphabet Complete!')).not.toBeInTheDocument();
  });

  it('renders the clear button on canvas', () => {
    render(<AlphabetTracer />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});
