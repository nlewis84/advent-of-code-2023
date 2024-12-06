const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseMap(input) {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

  let guard = null;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if ("^v<>".includes(grid[y][x])) {
        guard = {
          x,
          y,
          direction:
            grid[y][x] === "^"
              ? "up"
              : grid[y][x] === "v"
                ? "down"
                : grid[y][x] === "<"
                  ? "left"
                  : "right",
        };
        // remove guard from the grid
        grid[y][x] = ".";
      }
    }
  }

  return { grid, guard };
}

function moveGuard(guard, grid) {
  const moves = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 },
  };

  const directions = ["up", "right", "down", "left"];
  const { x, y, direction } = guard;
  const { dx, dy } = moves[direction];
  const newX = x + dx;
  const newY = y + dy;

  // out of bounds, return null
  if (newY < 0 || newY >= grid.length || newX < 0 || newX >= grid[0].length) {
    return null;
  }

  // obstacle, turn right
  if (grid[newY][newX] === "#") {
    const newDirection =
      directions[(directions.indexOf(direction) + 1) % directions.length];
    return { x, y, direction: newDirection };
  }

  // move forward
  return { x: newX, y: newY, direction };
}

function simulatePatrol(map) {
  const visited = new Set();
  let { guard, grid } = map;

  while (guard) {
    visited.add(`${guard.x},${guard.y}`);
    guard = moveGuard(guard, grid);
  }

  return visited;
}

function countVisitedPositions(visited) {
  return visited.size;
}

function isLooping(grid, guard, obstruction) {
  const tempGrid = grid.map((row) => [...row]);
  tempGrid[obstruction.y][obstruction.x] = "#";

  const visitedStates = new Set();
  let currentGuard = { ...guard };

  while (true) {
    const state = `${currentGuard.x},${currentGuard.y},${currentGuard.direction}`;
    if (visitedStates.has(state)) {
      return true; // Loop detected
    }
    visitedStates.add(state);

    const nextGuard = moveGuard(currentGuard, tempGrid);
    if (!nextGuard) {
      return false; // Guard exits the grid
    }
    currentGuard = nextGuard;
  }
}

// Part 1
function part1(lines) {
  const map = parseMap(lines.join("\n"));
  const visited = simulatePatrol(map);
  return countVisitedPositions(visited);
}

// Part 2
function part2(lines) {
  console.time("part2 Execution Time");

  const map = parseMap(lines.join("\n"));
  const { grid, guard } = map;

  let loopCount = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#" || (x === guard.x && y === guard.y)) {
        continue;
      }

      if (isLooping(grid, guard, { x, y })) {
        loopCount++;
      }
    }
  }

  console.timeEnd("part2 Execution Time");

  return loopCount;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseMap,
  moveGuard,
  simulatePatrol,
  countVisitedPositions,
  isLooping,
};
