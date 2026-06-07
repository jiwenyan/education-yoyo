import { render, screen, fireEvent } from '@testing-library/react';
import MathSolver from './MathSolver';

describe('MathSolver', () => {
  it('renders problem display and answer input', () => {
    render(<MathSolver difficulty={1} count={3} />);
    expect(screen.getByTestId('problem-display')).toBeInTheDocument();
    expect(screen.getByTestId('answer-input')).toBeInTheDocument();
    expect(screen.getByTestId('score-bar')).toBeInTheDocument();
  });

  it('renders help button', () => {
    render(<MathSolver difficulty={1} count={3} />);
    expect(screen.getByTestId('help-btn')).toBeInTheDocument();
  });

  it('help button has generic aria-label', () => {
    render(<MathSolver difficulty={1} count={3} />);
    expect(screen.getByTestId('help-btn')).toHaveAttribute('aria-label', 'Help');
  });

  it('shows Making10Help overlay when help button is clicked', () => {
    render(<MathSolver difficulty={1} count={3} />);
    fireEvent.click(screen.getByTestId('help-btn'));
    expect(screen.getByTestId('making-10-help')).toBeInTheDocument();
  });

  it('hides Making10Help overlay when close button is clicked', () => {
    render(<MathSolver difficulty={1} count={3} />);
    fireEvent.click(screen.getByTestId('help-btn'));
    expect(screen.getByTestId('making-10-help')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('making-10-close'));
    expect(screen.queryByTestId('making-10-help')).not.toBeInTheDocument();
  });

  it('renders the question mark in the problem display', () => {
    render(<MathSolver difficulty={1} count={3} />);
    const display = screen.getByTestId('problem-display');
    expect(display).toHaveTextContent('?');
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
    fireEvent.click(screen.getByTestId('backspace-btn'));
    expect(screen.getByTestId('answer-display')).toHaveTextContent('5');
  });

  it('shows feedback after submitting answer', () => {
    render(<MathSolver difficulty={1} count={3} />);
    fireEvent.click(screen.getByTestId('digit-btn-5'));
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('feedback-overlay')).toBeInTheDocument();
  });

  it('shows completion screen after all problems', () => {
    render(<MathSolver difficulty={1} count={1} />);

    fireEvent.click(screen.getByTestId('digit-btn-5'));
    const okBtn = screen.getByTestId('submit-btn');
    expect(okBtn).toBeEnabled();
    fireEvent.click(okBtn);
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('All Done!')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('reset button works on complete screen', () => {
    render(<MathSolver difficulty={1} count={1} />);

    fireEvent.click(screen.getByTestId('digit-btn-5'));
    fireEvent.click(screen.getByTestId('submit-btn'));
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('Try Again'));
    expect(screen.getByTestId('problem-display')).toBeInTheDocument();
  });

  // --- New tests ---

  it('renders division problems when operation is division', () => {
    render(<MathSolver difficulty={1} count={3} operation="division" />);
    expect(screen.getByTestId('problem-display')).toBeInTheDocument();
    expect(screen.getByTestId('problem-display')).toHaveTextContent('÷');
  });

  it('shows Change Operation button on completion when onChangeOperation is provided', () => {
    const handleChangeOp = vi.fn();
    render(
      <MathSolver
        difficulty={1}
        count={1}
        operation="addition"
        onChangeOperation={handleChangeOp}
      />
    );

    fireEvent.click(screen.getByTestId('digit-btn-5'));
    fireEvent.click(screen.getByTestId('submit-btn'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByTestId('change-op-btn')).toBeInTheDocument();
    expect(screen.getByText('Change Operation')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('change-op-btn'));
    expect(handleChangeOp).toHaveBeenCalledTimes(1);
  });

  it('does not show Change Operation button when onChangeOperation is not provided', () => {
    render(<MathSolver difficulty={1} count={1} operation="addition" />);

    fireEvent.click(screen.getByTestId('digit-btn-5'));
    fireEvent.click(screen.getByTestId('submit-btn'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.queryByTestId('change-op-btn')).not.toBeInTheDocument();
  });

  it('renders subtraction problems when operation is subtraction', () => {
    render(<MathSolver difficulty={1} count={3} operation="subtraction" />);
    expect(screen.getByTestId('problem-display')).toBeInTheDocument();
    expect(screen.getByTestId('problem-display')).toHaveTextContent('-');
  });

  it('shows BreakTenHelp when help is clicked for subtraction', () => {
    render(<MathSolver difficulty={3} count={3} operation="subtraction" />);
    fireEvent.click(screen.getByTestId('help-btn'));
    expect(screen.getByTestId('break-ten-help')).toBeInTheDocument();
  });

  it('shows Making10Help when help is clicked for addition', () => {
    render(<MathSolver difficulty={1} count={3} operation="addition" />);
    fireEvent.click(screen.getByTestId('help-btn'));
    expect(screen.getByTestId('making-10-help')).toBeInTheDocument();
  });
});
