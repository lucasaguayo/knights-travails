# Knight's Travails

Finds the shortest path a knight can take between two squares of a chessboard. Built in JavaScript as part of [The Odin Project](https://www.theodinproject.com/lessons/javascript-knights-travails).

## How it works

The board is an 8x8 grid with coordinates from `[0, 0]` to `[7, 7]`. The solution uses **breadth-first search (BFS)**:

1. Start with a queue containing the starting square and its path.
2. Take the first square from the queue. If it is the destination, return its path.
3. Otherwise, calculate its legal knight moves (up to 8), skip squares already visited, and enqueue the rest with their extended path.

Because BFS explores the board level by level (all squares 1 move away, then 2, and so on), the first time the destination is reached is guaranteed to be via a shortest path. A `Set` of visited squares prevents revisiting squares and looping forever.