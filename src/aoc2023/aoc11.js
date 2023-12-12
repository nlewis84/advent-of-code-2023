const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  // Input: string of lines; ex: "..#\n...\n#.."
  // Output: array of arrays; ex: [ [".", ".", "#"], [".", ".", "."], ["#", ".", "."] ]

  const lines = input.split("\n");
  return lines.map((row) => row.split(""));
}

function findEmptyRowsAndCols(grid) {
  // Input: array of arrays; ex: [ [".", ".", "#"], [".", ".", "."], ["#", ".", "."] ]
  // Output: object with emptyRows and emptyCols; ex: { emptyRows: Set(2) { 1, 2 }, emptyCols: Set(1) { 1 } }

  const emptyRows = new Set();
  const emptyCols = new Set();

  // check each row for emptiness
  for (let y = 0; y < grid.length; y++) {
    if (grid[y].every((cell) => cell === ".")) {
      emptyRows.add(y);
    }
  }

  // check each column for emptiness
  for (let x = 0; x < grid[0].length; x++) {
    let empty = true;
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] !== ".") {
        empty = false;
        break;
      }
    }
    if (empty) {
      emptyCols.add(x);
    }
  }

  return { emptyRows, emptyCols };
}

function calculateShortestPaths(grid, emptyRows, emptyCols, expansionFactor) {
  // Input: array of arrays, empty rows, empty cols; ex: [ [".", ".", "#"], [".", ".", "."], ["#", ".", "."] ], { emptyRows: Set(2) { 1, 2 }, emptyCols: Set(1) { 1 } }
  // Output: number; ex: 4

  // find all galaxies
  const galaxies = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        galaxies.push([x, y]);
      }
    }
  }

  // calculate total path length
  let totalPathLength = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [x1, y1] = galaxies[i];
      const [x2, y2] = galaxies[j];
      const xDist = Math.abs(x2 - x1);
      const yDist = Math.abs(y2 - y1);

      // this is where the magic happens
      const expandedX =
        Array.from({ length: xDist }, (_, k) => k + Math.min(x1, x2)).filter(
          (x) => emptyCols.has(x)
        ).length *
        (expansionFactor - 1);

      const expandedY =
        Array.from({ length: yDist }, (_, k) => k + Math.min(y1, y2)).filter(
          (y) => emptyRows.has(y)
        ).length *
        (expansionFactor - 1);

      totalPathLength += xDist + yDist + expandedX + expandedY;
    }
  }

  return totalPathLength;
}

// Part 1
function part1(lines) {
  const grid = parseInput(lines);
  const { emptyRows, emptyCols } = findEmptyRowsAndCols(grid);
  const totalPathLength = calculateShortestPaths(grid, emptyRows, emptyCols, 2);
  return totalPathLength;
}

// Part 2
function part2(lines) {
  const grid = parseInput(lines);
  const { emptyRows, emptyCols } = findEmptyRowsAndCols(grid);
  const totalPathLength = calculateShortestPaths(
    grid,
    emptyRows,
    emptyCols,
    1000000
  );
  return totalPathLength;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  findEmptyRowsAndCols,
  calculateShortestPaths,
};
