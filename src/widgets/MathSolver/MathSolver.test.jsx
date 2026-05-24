import { render, screen, fireEvent } from '@testing-library/react';
import MathSolver from './MathSolver';

describe('MathSolver', () => {
  it('renders problem display and answer input', () => {
    render(<MathSolver difficulty={1} count={3} />);
    expect(screen.getByTestId('problem-display')).toBeInTheDocument();
    expect(screen.getByTestId('answer-input')).toBeInTheDocument();
    expect(screen.getByTestId('score-bar')).toBeInTheDocument();
  });

  it('renders the question mark', () => {
    render(<MathSolver difficulty={1} count={3} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('accepts digit input', () => {
    render(<MathSolver difficulty={1} count={3} />);
    fireEvent.click(screen.getByTestId('digit-btn-5'));
    expect(screen.getByTestId('answer-display')).toHaveTextContent('5');
  });

  it('allows backspace', () => {
    render(<MathSolver difficulty={1} count={3} />);
    fireEvent.click(screen.getByTestId('digit-btn-5'));
    fireEvent.click(screen.getByTestId('digit-btn-3'));
    expect(screen.getByTestId('answer-display')).toHaveTextContent('53');
    fireEvent.click(screen.getByText('⌫'));
    expect(screen.getByTestId('answer-display')).toHaveTextContent('5');
  });

  it('shows feedback after submitting answer', () => {
    render(<MathSolver difficulty={1} count={3} />);
    fireEvent.click(screen.getByTestId('digit-btn-5'));
    fireEvent.click(screen.getByText('OK'));
    expect(screen.getByTestId('feedback-overlay')).toBeInTheDocument();
  });

  it('shows completion screen after all problems', () => {
    render(<MathSolver difficulty={1} count={1} />);

    fireEvent.click(screen.getByTestId('digit-btn-5'));
    const okBtn = screen.getByText('OK');
    // OK button is disabled when no input, but we have '5' entered so it should be enabled
    expect(okBtn).toBeEnabled();
    fireEvent.click(okBtn);
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('All Done!')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('reset button works on complete screen', () => {
    render(<MathSolver difficulty={1} count={1} />);

    fireEvent.click(screen.getByTestId('digit-btn-5'));
    fireEvent.click(screen.getByText('OK'));
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('Try Again'));
    expect(screen.getByTestId('problem-display')).toBeInTheDocument();
  });
});
