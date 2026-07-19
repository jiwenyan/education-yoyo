import { render, screen, fireEvent } from '@testing-library/react';
import GradeSelector from './GradeSelector';

describe('GradeSelector', () => {
  it('renders all 4 grade buttons', () => {
    render(<GradeSelector onSelect={() => {}} onBack={() => {}} />);

    expect(screen.getByTestId('grade-btn-2')).toBeInTheDocument();
    expect(screen.getByTestId('grade-btn-3')).toBeInTheDocument();
    expect(screen.getByTestId('grade-btn-4')).toBeInTheDocument();
    expect(screen.getByTestId('grade-btn-5')).toBeInTheDocument();
  });

  it('displays grade labels and descriptions', () => {
    render(<GradeSelector onSelect={() => {}} onBack={() => {}} />);

    expect(screen.getByText('Grade 2')).toBeInTheDocument();
    expect(screen.getByText('Grade 3')).toBeInTheDocument();
    expect(screen.getByText('Grade 4')).toBeInTheDocument();
    expect(screen.getByText('Grade 5+')).toBeInTheDocument();
    expect(screen.getByText("I'm learning to multiply!")).toBeInTheDocument();
    expect(screen.getByText("I'm a math whiz!")).toBeInTheDocument();
  });

  it('displays table hints for grades 2-4', () => {
    render(<GradeSelector onSelect={() => {}} onBack={() => {}} />);

    expect(screen.getByText('×2, ×5, ×10')).toBeInTheDocument();
    expect(screen.getByText('×3, ×4, ×8, ×11')).toBeInTheDocument();
    expect(screen.getByText('×6, ×7, ×9, ×12')).toBeInTheDocument();
  });

  it('displays multi-digit for grade 5', () => {
    render(<GradeSelector onSelect={() => {}} onBack={() => {}} />);

    expect(screen.getByText('multi-digit')).toBeInTheDocument();
  });

  it('fires onSelect with the correct grade on click', () => {
    const handleSelect = vi.fn();
    render(<GradeSelector onSelect={handleSelect} onBack={() => {}} />);

    fireEvent.click(screen.getByTestId('grade-btn-2'));
    expect(handleSelect).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByTestId('grade-btn-5'));
    expect(handleSelect).toHaveBeenCalledWith(5);
  });

  it('fires onBack when back button is clicked', () => {
    const handleBack = vi.fn();
    render(<GradeSelector onSelect={() => {}} onBack={handleBack} />);

    fireEvent.click(screen.getByTestId('grade-selector-back'));
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('does not render back button when onBack is not provided', () => {
    render(<GradeSelector onSelect={() => {}} />);

    expect(screen.queryByTestId('grade-selector-back')).not.toBeInTheDocument();
  });

  it('renders the root container with data-testid', () => {
    render(<GradeSelector onSelect={() => {}} />);

    expect(screen.getByTestId('grade-selector')).toBeInTheDocument();
  });
});
