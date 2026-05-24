import { randInt, pickRandom, shuffle } from './random';

describe('randInt', () => {
  it('returns a number within the specified range', () => {
    for (let i = 0; i < 100; i++) {
      const result = randInt(3, 7);
      expect(result).toBeGreaterThanOrEqual(3);
      expect(result).toBeLessThanOrEqual(7);
    }
  });

  it('returns an integer', () => {
    for (let i = 0; i < 50; i++) {
      const result = randInt(1, 100);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('works when min equals max', () => {
    expect(randInt(5, 5)).toBe(5);
  });

  it('works with negative numbers', () => {
    for (let i = 0; i < 100; i++) {
      const result = randInt(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    }
  });
});

describe('pickRandom', () => {
  it('returns a random element from the array', () => {
    const arr = ['a', 'b', 'c'];
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(pickRandom(arr));
    }
    // With 100 tries we should see all three
    expect(results.size).toBe(3);
  });

  it('returns undefined for an empty array', () => {
    expect(pickRandom([])).toBeUndefined();
  });

  it('returns undefined for null or undefined', () => {
    expect(pickRandom(null)).toBeUndefined();
    expect(pickRandom(undefined)).toBeUndefined();
  });

  it('returns the only element for single-element array', () => {
    expect(pickRandom([42])).toBe(42);
  });
});

describe('shuffle', () => {
  it('returns a new array with same elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    expect(shuffled).not.toBe(original);
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns an empty array for empty input', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const original = [1, 2, 3];
    const copy = [...original];
    shuffle(original);
    expect(original).toEqual(copy);
  });

  it('returns same array for single element', () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it('preserves length', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(shuffle(original)).toHaveLength(8);
  });
});
