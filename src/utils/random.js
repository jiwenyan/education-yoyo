/**
 * Returns a random integer between min and max (inclusive).
 */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Picks a random element from an array.
 * Returns undefined for empty arrays.
 */
export function pickRandom(arr) {
  if (!arr || arr.length === 0) return undefined;
  return arr[randInt(0, arr.length - 1)];
}

/**
 * Returns a new array with elements shuffled using Fisher-Yates algorithm.
 */
export function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
