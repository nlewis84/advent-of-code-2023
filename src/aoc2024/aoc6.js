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
  let stepCounter = 0;

  while (currentGuard) {
    stepCounter++;
    if (stepCounter % 1000 === 0) {
      // Log every 1000 steps
      console.log(
        `Guard has taken ${stepCounter} steps for obstruction ${JSON.stringify(
          obstruction
        )}`
      );
    }

    const position = `${currentGuard.x},${currentGuard.y}`;
    const state = { position, direction: currentGuard.direction };
    path.push(state);

    if (detectLoop(path)) {
      console.log(
        `Loop detected for obstruction ${JSON.stringify(
          obstruction
        )} after ${stepCounter} steps.`
      );
      return path; // Return the path with a detected loop
    }

    currentGuard = moveGuard(currentGuard, gridCopy);
  }

  console.log(
    `No loop detected for obstruction ${JSON.stringify(
      obstruction
    )} after ${stepCounter} steps.`
  );
  return path; // Return path if no loop detected
}

function detectLoop(path) {
  const seen = new Map();

  for (let i = 0; i < path.length; i++) {
    const { position, direction } = path[i];

    if (seen.has(position)) {
      const previousState = seen.get(position);

      if (previousState.direction === direction) {
        const loopStart = previousState.index;
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
          console.log(
            `Confirmed loop at position ${position} with direction ${direction}`
          );
          return true;
        }
      }
    }

    seen.set(position, { direction, index: i });
  }

  return false;
}

function findLoopObstructionPositions(map) {
  const { grid } = map;
  const candidates = findObstructionCandidates(grid, map.guard);

  const validLoopPositions = [];
  let loopCounter = 0;

  console.time("findLoopObstructionPositions"); // Start timer
  console.log(`Total candidates to test: ${candidates.length}`);

  const startTime = Date.now();

  for (const [index, obstruction] of candidates.entries()) {
    if (index % 100 === 0) {
      const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(
        `Processed ${index + 1}/${
          candidates.length
        } candidates... Elapsed time: ${elapsedSeconds}s`
      );
    }

    const path = simulateWithObstruction(map, obstruction);

    if (detectLoop(path)) {
      validLoopPositions.push(obstruction);
      loopCounter++;
    }
  }

  console.timeEnd("findLoopObstructionPositions"); // End timer
  console.log(`Total loops detected: ${loopCounter}`);

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
