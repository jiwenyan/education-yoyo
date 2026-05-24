import { render, screen, act } from '@testing-library/react';
import { AppProvider, useAppContext } from './AppContext';

function TestComponent() {
  const { state, dispatch } = useAppContext();
  return (
    <div>
      <span data-testid="theme">{state.theme}</span>
      <span data-testid="difficulty">{state.difficulty}</span>
      <button
        data-testid="dispatch"
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
      >
        Set Dark
      </button>
    </div>
  );
}

describe('AppProvider', () => {
  it('renders children', () => {
    render(
      <AppProvider>
        <div data-testid="child">Hello</div>
      </AppProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides initial state to children', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('difficulty')).toHaveTextContent('1');
  });

  it('provides dispatch function', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    await act(async () => {
      screen.getByTestId('dispatch').click();
    });
    await screen.findByText('dark');
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});

describe('useAppContext', () => {
  it('throws when used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function BadComponent() {
      useAppContext();
      return null;
    }
    expect(() => render(<BadComponent />)).toThrow(
      'useAppContext must be used within an AppProvider'
    );
    consoleSpy.mockRestore();
  });
});
