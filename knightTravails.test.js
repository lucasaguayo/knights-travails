import { knightMoves } from './knightTravails.js';

// A knight step changes (dx, dy) by a combination of 1 and 2
const isKnightStep = (a, b) => {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
};

const isOnBoard = ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7;

describe('knightMoves', () => {
  test('returns only the starting square when start and end are the same', () => {
    expect(knightMoves([3, 3], [3, 3])).toEqual([[3, 3]]);
  });

  test('solves a single direct move', () => {
    expect(knightMoves([0, 0], [1, 2])).toEqual([
      [0, 0],
      [1, 2],
    ]);
  });

  test.each([
    [[0, 0], [3, 3], 2],
    [[3, 3], [0, 0], 2],
    [[0, 0], [7, 7], 6],
    [[3, 3], [4, 3], 3],
  ])('from %j to %j takes %i moves', (start, end, moves) => {
    const path = knightMoves(start, end);
    expect(path.length - 1).toBe(moves);
  });

  test('path starts at start and ends at end', () => {
    const start = [0, 0];
    const end = [7, 7];
    const path = knightMoves(start, end);

    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(end);
  });

  test('every step is a valid knight move and stays on the board', () => {
    const path = knightMoves([0, 0], [7, 7]);

    path.forEach((square, i) => {
      expect(isOnBoard(square)).toBe(true);
      if (i > 0) expect(isKnightStep(path[i - 1], square)).toBe(true);
    });
  });

  test('throws error if start or end is off the board', () => {
    expect(() => knightMoves([0, 0], [8, 8])).toThrow('Square out of bounds.');
    expect(() => knightMoves([-1, 0], [3, 3])).toThrow('Square out of bounds.');
  });
});