const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function getDirectionVectors() {
  // 8 possible directions (horizontal, vertical, diagonal)
  return [
    [0, 1], // Right
    [1, 0], // Down
    [1, 1], // Down-Right
    [1, -1], // Down-Left
    [0, -1], // Left
    [-1, 0], // Up
    [-1, -1], // Up-Left
    [-1, 1], // Up-Right
  ];
}

function isWordInDirection(grid, word, startRow, startCol, direction) {
  const [dx, dy] = direction;

  for (let i = 0; i < word.length; i++) {
    const newRow = startRow + i * dx;
    const newCol = startCol + i * dy;

    // Check bounds and character match
    if (
      newRow < 0 ||
      newRow >= grid.length ||
      newCol < 0 ||
      newCol >= grid[newRow].length ||
      grid[newRow][newCol] !== word[i]
    ) {
      return false;
    }
  }

  return true;
}

function findOccurrences(grid, word) {
  const directions = getDirectionVectors();
  const wordLength = word.length;
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // Start searching if the first letter matches
      if (grid[row][col] === word[0]) {
        for (const [dx, dy] of directions) {
          if (isWordInDirection(grid, word, row, col, [dx, dy])) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

function findCenters(grid) {
  const centers = [];

  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      if (grid[row][col] === "A") {
        centers.push([row, col]);
      }
    }
  }

  // console.log("Centers:", centers);
  return centers;
}

// Part 1
function part1(lines) {
  const grid = lines.map((row) => row.split(""));
  return findOccurrences(grid, "XMAS");
}

// Part 2
function part2(lines) {
  const grid = lines.map((row) => row.split(""));
  const centers = findCenters(grid);
  let count = 0;

  for (const [row, col] of centers) {
    // Check diagonal directions
    const diag1Valid =
      isWordInDirection(grid, "MAS", row - 1, col - 1, [1, 1]) ||
      isWordInDirection(grid, "SAM", row - 1, col - 1, [1, 1]);

    const diag2Valid =
      isWordInDirection(grid, "MAS", row - 1, col + 1, [1, -1]) ||
      isWordInDirection(grid, "SAM", row - 1, col + 1, [1, -1]);

    if (diag1Valid && diag2Valid) {
      count++;
    }
  }

  return count;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  getDirectionVectors,
  isWordInDirection,
  findOccurrences,
  findCenters,
};
