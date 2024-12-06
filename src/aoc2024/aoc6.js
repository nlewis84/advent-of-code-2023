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

// Part 1
function part1(lines) {
  const map = parseMap(lines.join("\n"));
  const visited = simulatePatrol(map);
  return countVisitedPositions(visited);
}

// Part 2
function part2(lines) {
  return 0;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseMap,
  moveGuard,
  simulatePatrol,
  countVisitedPositions,
};
