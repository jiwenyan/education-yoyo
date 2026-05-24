/**
 * @jest-environment jsdom
 */
import { loadState, saveState, clearState } from './storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads data', () => {
    saveState('test', { foo: 'bar' });
    expect(loadState('test')).toEqual({ foo: 'bar' });
  });

  it('returns null for missing keys', () => {
    expect(loadState('nonexistent')).toBeNull();
  });

  it('clears data', () => {
    saveState('test', 42);
    clearState('test');
    expect(loadState('test')).toBeNull();
  });

  it('handles corrupt JSON gracefully', () => {
    localStorage.setItem('mathapp_corrupt', '{bad json');
    expect(loadState('corrupt')).toBeNull();
  });

  it('handles various data types', () => {
    saveState('number', 42);
    expect(loadState('number')).toBe(42);

    saveState('string', 'hello');
    expect(loadState('string')).toBe('hello');

    const arr = [1, 2, 3];
    saveState('array', arr);
    expect(loadState('array')).toEqual([1, 2, 3]);

    saveState('null', null);
    expect(loadState('null')).toBeNull();
  });

  it('uses the mathapp_ prefix', () => {
    saveState('key', 'value');
    const keys = Object.keys(localStorage);
    expect(keys).toContain('mathapp_key');
  });
});
