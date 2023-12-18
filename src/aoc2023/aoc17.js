const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));
  const start = createPosition(0, 0);
  const goal = createPosition(grid.length - 1, grid[0].length - 1);
  return { grid, start, goal };
}

function createPosition(x, y) {
  return { x, y };
}

function addPositions(pos1, pos2) {
  return createPosition(pos1.x + pos2.x, pos1.y + pos2.y);
}

function isValidPosition(pos, grid) {
  return (
    pos.x >= 0 && pos.x < grid.length && pos.y >= 0 && pos.y < grid[0].length
  );
}

function getMoves() {
  return [
    createPosition(-1, 0),
    createPosition(1, 0),
    createPosition(0, -1),
    createPosition(0, 1),
  ]; // Up, Down, Left, Right
}

function findShortestPath(
  grid,
  start,
  goal,
  maxInSameDirection,
  minInSameDirection
) {
  const moves = getMoves();
  const queue = [
    {
      position: start,
      prevDirection: null,
      prevCount: minInSameDirection > 0 ? minInSameDirection : 0,
      cost: 0,
    },
  ];
  const visited = new Map();

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const state = queue.shift();
    console.log(
      `Exploring: Pos (${state.position.x}, ${state.position.y}), PrevDir (${
        state.prevDirection?.x ?? "none"
      }, ${state.prevDirection?.y ?? "none"}), PrevCount ${
        state.prevCount
      }, Cost ${state.cost}`
    );
    const { position, prevDirection, prevCount, cost } = state;

    // Check for minimum distance before reaching the goal
    if (position.x === goal.x && position.y === goal.y) {
      if (prevCount >= 4) {
        return cost;
      }
    }

    const stateKey = `${position.x},${position.y},${
      prevDirection?.x ?? "none"
    },${prevDirection?.y ?? "none"},${prevCount}`;
    if (visited.has(stateKey)) {
      continue;
    }
    visited.set(stateKey, true);

    for (const move of moves) {
      const newPos = addPositions(position, move);
      if (!isValidPosition(newPos, grid)) continue;

      if (move.x === -prevDirection?.x && move.y === -prevDirection?.y)
        continue;

      const newCount =
        move.x === prevDirection?.x && move.y === prevDirection?.y
          ? prevCount + 1
          : 1;

      if (
        newCount > maxInSameDirection ||
        (prevDirection &&
          newCount < minInSameDirection &&
          position.x !== start.x &&
          position.y !== start.y)
      )
        continue;

      const newCost = cost + grid[newPos.x][newPos.y];
      queue.push({
        position: newPos,
        prevDirection: move,
        prevCount: newCount,
        cost: newCost,
      });
    }
  }

  throw new Error("Path not found");
}

// Part 1
function part1(lines) {
  const { grid, start, goal } = parseInput(lines);
  const result = findShortestPath(grid, start, goal, 3, 0);

  return result;
}

// Part 2
function part2(input) {
  const { grid, start, goal } = parseInput(input);
  const result = findShortestPath(grid, start, goal, 10, 4);

  return result;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_test_input, "utf-8");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  findShortestPath,
  createPosition,
  addPositions,
  isValidPosition,
  getMoves,
};
