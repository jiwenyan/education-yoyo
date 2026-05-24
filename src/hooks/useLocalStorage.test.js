import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('persists value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'default'));
    act(() => {
      result.current[1]('new value');
    });
    expect(result.current[0]).toBe('new value');
    expect(JSON.parse(localStorage.getItem('test'))).toBe('new value');
  });

  it('loads existing value from localStorage', () => {
    localStorage.setItem('existing', JSON.stringify('saved'));
    const { result } = renderHook(() => useLocalStorage('existing', 'default'));
    expect(result.current[0]).toBe('saved');
  });

  it('handles corrupt localStorage data', () => {
    localStorage.setItem('corrupt', '{bad json');
    const { result } = renderHook(() => useLocalStorage('corrupt', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(1);
  });

  it('syncs across tabs via storage event', () => {
    const { result } = renderHook(() => useLocalStorage('sync', 'tab1'));

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'sync',
        newValue: JSON.stringify('tab2'),
      });
      window.dispatchEvent(event);
    });

    expect(result.current[0]).toBe('tab2');
  });
});
