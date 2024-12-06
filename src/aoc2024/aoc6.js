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

function precomputeKeyPoints(grid) {
  const keyPoints = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => ({
      up: null,
      down: null,
      left: null,
      right: null,
    }))
  );

  const rows = grid.length;
  const cols = grid[0].length;

  // Precompute for each direction
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "#") continue; // Skip obstacles

      // Up
      for (let ny = y - 1; ny >= 0; ny--) {
        if (grid[ny][x] === "#") {
          keyPoints[y][x].up = { x, y: ny };
          break;
        }
      }
      if (keyPoints[y][x].up === null) keyPoints[y][x].up = { x, y: -1 };

      // Down
      for (let ny = y + 1; ny < rows; ny++) {
        if (grid[ny][x] === "#") {
          keyPoints[y][x].down = { x, y: ny };
          break;
        }
      }
      if (keyPoints[y][x].down === null) keyPoints[y][x].down = { x, y: rows };

      // Left
      for (let nx = x - 1; nx >= 0; nx--) {
        if (grid[y][nx] === "#") {
          keyPoints[y][x].left = { x: nx, y };
          break;
        }
      }
      if (keyPoints[y][x].left === null) keyPoints[y][x].left = { x: -1, y };

      // Right
      for (let nx = x + 1; nx < cols; nx++) {
        if (grid[y][nx] === "#") {
          keyPoints[y][x].right = { x: nx, y };
          break;
        }
      }
      if (keyPoints[y][x].right === null)
        keyPoints[y][x].right = { x: cols, y };
    }
  }

  return keyPoints;
}

function moveGuardFast(guard, keyPoints, grid) {
  const directions = ["up", "right", "down", "left"];
  const { x, y, direction } = guard;

  const keyPoint = keyPoints[y][x][direction];
  if (!keyPoint) return null;

  // Move guard directly to the next key point
  const newX = keyPoint.x;
  const newY = keyPoint.y;

  // Check for out-of-bounds
  if (newY < 0 || newY >= grid.length || newX < 0 || newX >= grid[0].length) {
    return null;
  }

  // Check for obstacles
  if (grid[newY][newX] === "#") {
    const newDirection =
      directions[(directions.indexOf(direction) + 1) % directions.length];
    return { x, y, direction: newDirection }; // Guard turns right without moving
  }

  // Move forward
  return { x: newX, y: newY, direction };
}

function simulateWithObstructionFast(map, obstruction, keyPoints) {
  const { grid, guard } = map;
  const gridCopy = grid.map((row) => [...row]);
  gridCopy[obstruction.y][obstruction.x] = "#";

  const path = [];
  let currentGuard = { ...guard };
  let stepCounter = 0;

  while (currentGuard) {
    stepCounter++;

    const position = `${currentGuard.x},${currentGuard.y}`;
    const state = { position, direction: currentGuard.direction };
    path.push(state);

    if (detectLoop(path)) {
      return path; // Return the path with a detected loop
    }

    currentGuard = moveGuardFast(currentGuard, keyPoints, gridCopy);
  }

  return path; // Return path if no loop detected
}

function findLoopObstructionPositionsFast(map) {
  const { grid } = map;
  const keyPoints = precomputeKeyPoints(grid); // Precompute key points
  const candidates = findObstructionCandidates(grid, map.guard);

  const validLoopPositions = [];

  for (const obstruction of candidates) {
    const path = simulateWithObstructionFast(map, obstruction, keyPoints);

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
