const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  // Input: string; ex: ".|...\....\n|.-.\....."
  // Output: two-dimensional array; ex: [[".", "|", ".", ".", ".", ".", ".", ".", "."], ["|", ".", "-", ".", ".", ".", ".", ".", "."]]
  // Split the input string into lines
  // console.log(input);
  const lines = input.split("\n");

  // Create a two-dimensional array to represent the grid
  const grid = lines.map((line) => line.split(""));

  return grid;
}

function simulateBeam(grid, startX = 0, startY = 0, startDir = "r") {
  // Input: two-dimensional array; ex: [[".", "|", ".", ".", ".", ".", ".", ".", "."], ["|", ".", "-", ".", ".", ".", ".", ".", "."]]
  // Output: number; ex: 6
  let beams = [{ x: startX, y: startY, direction: startDir }];
  const visited = {};

  while (beams.length > 0) {
    let newBeams = [];

    for (const beam of beams) {
      const key = `${beam.y}-${beam.x}`;
      if (!visited[key]) {
        visited[key] = {};
      }
      visited[key][beam.direction] = true;

      const current = grid[beam.y] ? grid[beam.y][beam.x] : null;
      const nextDirs = getNext(current, beam.direction);

      for (const dir of nextDirs) {
        const newBeam = {
          x: move(beam, dir).x,
          y: move(beam, dir).y,
          direction: dir,
        };

        // Check if off the map
        if (!grid[newBeam.y] || !grid[newBeam.y][newBeam.x]) {
          continue;
        }

        // Check if already visited in the same direction
        const newKey = `${newBeam.y}-${newBeam.x}`;
        if (visited[newKey] && visited[newKey][dir]) {
          continue;
        }

        newBeams.push(newBeam);
      }
    }

    beams = newBeams;
  }

  return Object.keys(visited).length;
}

function getNext(current, dir) {
  // Input: string; ex: ".", "r"
  // Output: array; ex: ["r"]
  const map = {
    ".": { r: ["r"], l: ["l"], u: ["u"], d: ["d"] },
    "|": { r: ["u", "d"], l: ["u", "d"], u: ["u"], d: ["d"] },
    "-": { r: ["r"], l: ["l"], u: ["r", "l"], d: ["r", "l"] },
    "/": { r: ["u"], l: ["d"], u: ["r"], d: ["l"] },
    "\\": { r: ["d"], l: ["u"], u: ["l"], d: ["r"] },
  };
  return map[current][dir];
}

function move(beam, dir) {
  // Input: object; ex: {x: 0, y: 0, direction: "r"}, "r"
  // Output: object; ex: {x: 1, y: 0}
  switch (dir) {
    case "r":
      return { x: beam.x + 1, y: beam.y };
    case "l":
      return { x: beam.x - 1, y: beam.y };
    case "u":
      return { x: beam.x, y: beam.y - 1 };
    case "d":
      return { x: beam.x, y: beam.y + 1 };
    default:
      return { x: beam.x, y: beam.y };
  }
}

function findBestStartingPosition(grid) {
  let maxEnergizedTiles = 0;
  let bestPosition = null;

  // Define functions to get starting positions and directions for each edge
  const getTopEdgeStarts = () =>
    Array(grid[0].length)
      .fill(0)
      .map((_, x) => ({ x, y: 0, dir: "d" }));
  const getBottomEdgeStarts = () =>
    Array(grid[0].length)
      .fill(0)
      .map((_, x) => ({ x, y: grid.length - 1, dir: "u" }));
  const getLeftEdgeStarts = () =>
    Array(grid.length)
      .fill(0)
      .map((_, y) => ({ x: 0, y, dir: "r" }));
  const getRightEdgeStarts = () =>
    Array(grid.length)
      .fill(0)
      .map((_, y) => ({ x: grid[0].length - 1, y, dir: "l" }));

  // Combine all edge starts
  const allStarts = [
    ...getTopEdgeStarts(),
    ...getBottomEdgeStarts(),
    ...getLeftEdgeStarts(),
    ...getRightEdgeStarts(),
  ];

  // Iterate over all starting positions
  for (const start of allStarts) {
    const energizedTiles = simulateBeam(grid, start.x, start.y, start.dir);
    if (energizedTiles > maxEnergizedTiles) {
      maxEnergizedTiles = energizedTiles;
      bestPosition = start;
    }
  }

  return { maxEnergizedTiles, bestPosition };
}

// Part 1
function part1(lines) {
  const grid = parseInput(lines);
  const energizedTiles = simulateBeam(grid);

  return energizedTiles;
}

// Part 2
function part2(input) {
  const grid = parseInput(input);
  const { maxEnergizedTiles, bestPosition } = findBestStartingPosition(grid);

  console.log("Best starting position:", bestPosition);
  return maxEnergizedTiles;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  simulateBeam,
  getNext,
  move,
};
