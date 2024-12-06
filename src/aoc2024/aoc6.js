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

function findObstructionCandidates(grid, guard) {
  const candidates = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      // Valid candidates are open positions (.) excluding the guard's starting position
      if (grid[y][x] === "." && !(x === guard.x && y === guard.y)) {
        candidates.push({ x, y });
      }
    }
  }
  return candidates;
}

function simulateWithObstruction(map, obstruction) {
  const { grid, guard } = map;
  const gridCopy = grid.map((row) => [...row]);
  gridCopy[obstruction.y][obstruction.x] = "#";

  const path = [];
  let currentGuard = { ...guard };

  while (currentGuard) {
    const position = `${currentGuard.x},${currentGuard.y}`;
    const state = { position, direction: currentGuard.direction };
    path.push(state);

    if (detectLoop(path)) {
      return path; // Return the path with a detected loop
    }

    currentGuard = moveGuard(currentGuard, gridCopy);
  }

  return path; // Return path if no loop detected
}

function detectLoop(path) {
  const seen = new Map(); // Track visited positions and their states (position + direction)

  for (let i = 0; i < path.length; i++) {
    const { position, direction } = path[i];

    if (seen.has(position)) {
      const previousState = seen.get(position);

      // Check if revisiting the same position with the same direction
      if (previousState.direction === direction) {
        const loopStart = previousState.index;

        // Check for a repeating pattern
        const loopLength = i - loopStart;
        const segment = path.slice(loopStart, i);
        const nextSegment = path.slice(i, i + loopLength);

        if (
          nextSegment.length === segment.length &&
          nextSegment.every(
            (step, idx) =>
              step.position === segment[idx].position &&
              step.direction === segment[idx].direction
          )
        ) {
          return true; // Confirm a valid loop
        }
      }
    }

    // Record the current state (position + direction)
    seen.set(position, { direction, index: i });
  }

  return false; // No loop detected
}

function findLoopObstructionPositions(map) {
  const { grid } = map;
  const candidates = findObstructionCandidates(grid, map.guard);

  const validLoopPositions = [];

  for (const obstruction of candidates) {
    const path = simulateWithObstruction(map, obstruction);

    if (detectLoop(path)) {
      validLoopPositions.push(obstruction);
    }
  }

  return validLoopPositions;
}

// Part 1
function part1(lines) {
  const map = parseMap(lines.join("\n"));
  const visited = simulatePatrol(map);
  return countVisitedPositions(visited);
}

// Part 2
function part2(lines) {
  const map = parseMap(lines.join("\n"));
  const loopObstructions = findLoopObstructionPositions(map);
  return loopObstructions.length;
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
  detectLoop,
  findObstructionCandidates,
  simulateWithObstruction,
  findLoopObstructionPositions,
};
