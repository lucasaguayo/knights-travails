// Checks if two given arrays are equal.
function isEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((value, i) => value === b[i])
  );
}

// Checks if a move is a legal move on the board.
function isLegal(move) {
  if (move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7) return false;
  return true;
}

// Calculates all the possible moves from a specific square.
function calculatePossibleMoves(position) {
  const possibleNextMoves = [
    [position[0] - 2, position[1] - 1],
    [position[0] - 1, position[1] - 2],
    [position[0] + 1, position[1] - 2],
    [position[0] + 2, position[1] - 1],
    [position[0] - 2, position[1] + 1],
    [position[0] - 1, position[1] + 2],
    [position[0] + 2, position[1] + 1],
    [position[0] + 1, position[1] + 2],
  ].filter(move => isLegal(move));

  return possibleNextMoves
}

// Calculates the knight's path from a given square to another.
function knightMoves(start, end) {
  if (!isLegal(start) || !isLegal(end)) throw new Error('Square out of bounds.');
  
  const visited = new Set([
    `${start[0]}, ${start[1]}`
  ]);

  // Initializes the queue with the starting position of the knight.
  const queue = [{
    position: start,
    path: [start]
  }];

  while (queue.length > 0) {
    const currentMove = queue.shift();
    // If the current position of the knight is the same as the destiny, we return the path.
    if (isEqual(currentMove.position, end)) return currentMove.path;

    // We calculate each possible move from the current position.
    for (const nextMove of calculatePossibleMoves(currentMove.position)) {
      // Saving the position (key) as 'x, y' in the set.
      const key = `${nextMove[0]}, ${nextMove[1]}`
      // If we visited that position already, we pass (ignoring backward moves).
      if (visited.has(key)) continue;
      // If not, we add it to the visited nodes set
      visited.add(key);
      // and push it to the queue, with its path already traveled.
      queue.push({
        position: nextMove, 
        path: [...currentMove.path, nextMove]
      });
    }
  }

  return null;
}

// Logs the knight's path.
function printPath(path) {
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((square) => console.log(square));
}

// Testing.
printPath(knightMoves([2, 0], [5, 4]));

export { knightMoves };