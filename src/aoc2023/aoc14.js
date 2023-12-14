const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  // Input: string; ex: "O....#....\nO.OO#....#\n.....##..."
  // Output: Array<Array<string>>; ex: [["O",".",".",".","#",".",".",".","."],["O",".","O","O","#",".",".",".","."],[".",".",".",".",".","#","#",".","."]]

  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
}

function calculateLoad(platform) {
  let rows = platform.length;
  let cols = platform[0].length;
  let moved;
  do {
    moved = false;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        if (platform[row][col] === "." && platform[row + 1][col] === "O") {
          // Swap '.' and 'O'
          platform[row][col] = "O";
          platform[row + 1][col] = ".";
          moved = true;
        }
      }
    }
  } while (moved);

  // Calculate load
  let totalLoad = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (platform[row][col] === "O") {
        totalLoad += rows - row;
      }
    }
  }
  return totalLoad;
}

// Part 1
function part1(lines) {
  let mirror = parseInput(lines);
  let answer = calculateLoad(mirror);
  return answer;
}

// Part 2
function part2(lines) {
  return 0;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  calculateLoad,
};
