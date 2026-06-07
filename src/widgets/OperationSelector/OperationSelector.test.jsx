import { render, screen, fireEvent } from '@testing-library/react';
import OperationSelector from './OperationSelector';

describe('OperationSelector', () => {
  it('renders all 4 operation buttons', () => {
    render(<OperationSelector onSelect={() => {}} currentOperation={null} />);

    expect(screen.getByTestId('operation-btn-addition')).toBeInTheDocument();
    expect(screen.getByTestId('operation-btn-subtraction')).toBeInTheDocument();
    expect(screen.getByTestId('operation-btn-multiplication')).toBeInTheDocument();
    expect(screen.getByTestId('operation-btn-division')).toBeInTheDocument();
  });

  it('displays operation symbols and labels', () => {
    render(<OperationSelector onSelect={() => {}} currentOperation={null} />);

    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('Addition')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getByText('Subtraction')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('Multiplication')).toBeInTheDocument();
    expect(screen.getByText('÷')).toBeInTheDocument();
    expect(screen.getByText('Division')).toBeInTheDocument();
  });

  it('fires onSelect with correct operation on click', () => {
    const handleSelect = vi.fn();
    render(<OperationSelector onSelect={handleSelect} currentOperation={null} />);

    fireEvent.click(screen.getByTestId('operation-btn-addition'));
    expect(handleSelect).toHaveBeenCalledWith('addition');

    fireEvent.click(screen.getByTestId('operation-btn-subtraction'));
    expect(handleSelect).toHaveBeenCalledWith('subtraction');

    fireEvent.click(screen.getByTestId('operation-btn-multiplication'));
    expect(handleSelect).toHaveBeenCalledWith('multiplication');

    fireEvent.click(screen.getByTestId('operation-btn-division'));
    expect(handleSelect).toHaveBeenCalledWith('division');
  });

  it('highlights the selected button', () => {
    const { rerender } = render(
      <OperationSelector onSelect={() => {}} currentOperation="addition" />
    );

    const addBtn = screen.getByTestId('operation-btn-addition');
    expect(addBtn.className).toContain('selected');

    const subBtn = screen.getByTestId('operation-btn-subtraction');
    expect(subBtn.className).not.toContain('selected');

    rerender(<OperationSelector onSelect={() => {}} currentOperation="division" />);
    expect(screen.getByTestId('operation-btn-division').className).toContain('selected');
    expect(screen.getByTestId('operation-btn-addition').className).not.toContain('selected');
  });
});
