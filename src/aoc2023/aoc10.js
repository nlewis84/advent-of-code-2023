const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  const lines = input.trim().split("\n");
  const grid = lines.map((line) => line.split(""));
  return grid;
}

function findStartPosition(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "S") {
        return { x, y };
      }
    }
  }
  throw new Error("Starting position not found");
}

// Deduces the pipe type at the starting position
function deduceStartPipeType(grid, { x, y }) {
  // Check the neighboring cells to determine the pipe type at 'S'
  // Example logic - adjust based on actual puzzle rules
  const neighbors = [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ];

  for (let i = 0; i < neighbors.length; i++) {
    const { x, y } = neighbors[i];
    if (grid[y][x] !== ".") {
      return grid[y][x];
    }
  }
  throw new Error("Unable to deduce pipe type for 'S'");
}

// Helper function for DFS
function dfs(grid, x, y, visited) {
  if (
    x < 0 ||
    x >= grid[0].length ||
    y < 0 ||
    y >= grid.length ||
    visited[y][x] ||
    grid[y][x] === "."
  ) {
    return;
  }

  visited[y][x] = true;

  // Add logic to move in the direction based on the pipe type
  // Continue DFS in the allowed directions
  dfs(grid, x + 1, y, visited); // East
  dfs(grid, x - 1, y, visited); // West
  dfs(grid, x, y + 1, visited); // South
  dfs(grid, x, y - 1, visited); // North
}

function getNextPositionsForS(x, y, grid) {
  const possibleTypes = ["|", "-", "F", "7", "J", "L"];
  return possibleTypes.map((type) => getNextPosition(x, y, type, x, y, grid));
}

// Function to get the next position based on the current pipe type
function getNextPosition(x, y, pipeType, prevX, prevY) {
  switch (pipeType) {
    case "F":
      return prevY < y ? { x: x + 1, y } : { x, y: y + 1 };
    case "7":
      return prevX < x ? { x, y: y + 1 } : { x: x - 1, y };
    case "J":
      return prevY > y ? { x: x - 1, y } : { x, y: y - 1 };
    case "L":
      return prevY > y ? { x: x + 1, y } : { x, y: y - 1 };
    case "|":
      return prevY < y ? { x, y: y + 1 } : { x, y: y - 1 };
    case "-":
      return prevX < x ? { x: x + 1, y } : { x: x - 1, y };
    default:
      throw new Error(`Unknown pipe type: ${pipeType}`);
  }
}

// Traverse the loop from the starting position
function traverseLoop(grid, startPosition) {
  const possibleStarts = getNextPositionsForS(
    startPosition.x,
    startPosition.y,
    grid
  );
  for (let i = 0; i < possibleStarts.length; i++) {
    const { type, nextPosition } = possibleStarts[i];
    if (traverseFromPosition(grid, startPosition, nextPosition, type)) {
      return type; // Found the correct type for 'S'
    }
  }
  throw new Error("Unable to determine pipe type for 'S'");
}

// Helper function to traverse from a given position
function traverseFromPosition(
  grid,
  startPosition,
  currentPosition,
  currentType
) {
  let previousPosition = startPosition;
  const path = [startPosition];

  while (
    !(
      currentPosition.x === startPosition.x &&
      currentPosition.y === startPosition.y
    ) ||
    path.length === 1
  ) {
    path.push(currentPosition);
    const { x, y } = currentPosition;
    const nextPosition = getNextPosition(
      x,
      y,
      currentType,
      previousPosition.x,
      previousPosition.y
    );
    previousPosition = currentPosition;
    currentPosition = nextPosition;
    currentType = grid[nextPosition.y][nextPosition.x];
  }

  // Check if the loop is valid and returns to 'S'
  return (
    currentPosition.x === startPosition.x &&
    currentPosition.y === startPosition.y
  );
}

// Calculate the farthest distance from the starting point
function calculateFarthestDistance(path, startPosition) {
  let maxDistance = 0;
  path.forEach((position, index) => {
    const distance =
      Math.abs(startPosition.x - position.x) +
      Math.abs(startPosition.y - position.y);
    maxDistance = Math.max(maxDistance, distance);
  });
  return maxDistance;
}

function part1(input) {
  const grid = parseInput(input);
  const startPosition = findStartPosition(grid);
  const startPipeType = deduceStartPipeType(grid, startPosition);
  const loopTiles = traverseLoop(grid, startPosition, startPipeType);
  return calculateFarthestDistance(loopTiles, startPosition);
}

function part2(input) {
  return 0;
}

// Reading from file and running the solution
const lines = fs.readFileSync(aoc_test_input, "utf-8");
console.log("Part 1:", part1(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  findStartPosition,
};
