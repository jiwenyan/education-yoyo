import { alphabetData } from './alphabetData';

describe('alphabetData', () => {
  it('has exactly 26 entries', () => {
    expect(alphabetData).toHaveLength(26);
  });

  it('starts with A and ends with Z', () => {
    expect(alphabetData[0].letter).toBe('A');
    expect(alphabetData[25].letter).toBe('Z');
  });

  it('every entry has all required fields', () => {
    alphabetData.forEach((entry) => {
      expect(entry).toHaveProperty('letter');
      expect(entry).toHaveProperty('uppercase');
      expect(entry).toHaveProperty('lowercase');
      expect(entry).toHaveProperty('word');
      expect(entry).toHaveProperty('wordImage');
    });
  });

  it('uppercase matches letter', () => {
    alphabetData.forEach((entry) => {
      expect(entry.uppercase).toBe(entry.letter);
    });
  });

  it('lowercase is the lowercase version of letter', () => {
    alphabetData.forEach((entry) => {
      expect(entry.lowercase).toBe(entry.letter.toLowerCase());
    });
  });

  it('contains all letters A-Z in order', () => {
    const expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => l);
    const actual = alphabetData.map((e) => e.letter);
    expect(actual).toEqual(expected);
  });

  it('every word is a non-empty string', () => {
    alphabetData.forEach((entry) => {
      expect(typeof entry.word).toBe('string');
      expect(entry.word.length).toBeGreaterThan(0);
    });
  });

  it('every wordImage is a non-empty string', () => {
    alphabetData.forEach((entry) => {
      expect(typeof entry.wordImage).toBe('string');
      expect(entry.wordImage.length).toBeGreaterThan(0);
    });
  });
});
