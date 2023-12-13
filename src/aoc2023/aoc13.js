const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  // Input: string; ex: "#.##..##.\n..#.##.#.\n##......#"
  // Output: Array<Array<string>>; ex: [["#",".","#","#",".",".","#","#","."],[".",".","#",".","#","#",".","#","."],["#","#",".",".",".",".",".","#"]]
  const patterns = input.split("\n\n");

  return patterns.map((pattern) =>
    pattern.split("\n").map((row) => row.split(""))
  );
}

function findReflectionLine(pattern) {
  // Input: Array of array of strings; ex: [["#", ".", "#", "#", ".", ".", "#", "#", "."], [".", ".", "#", ".", "#", "#", ".", "#", "."], ["#", "#", ".", ".", ".", ".", ".", ".", "#"], ["#", "#", ".", ".", ".", ".", ".", ".", "#"], [".", ".", "#", ".", "#", "#", ".", "#", "."], [".", ".", "#", "#", ".", ".", "#", "#", "."], ["#", ".", "#", ".", "#", "#", ".", "#", "."]]
  // Output: {type: string, index: number}; ex: {type: "vertical", index: 3}
  const numRows = pattern.length;
  const numCols = pattern[0].length;

  // Create strings for each row
  const rowStrings = pattern.map((row) => row.join(""));

  // Check for horizontal reflection
  for (let row = 0; row < numRows - 1; row++) {
    if (rowStrings[row] === rowStrings[row + 1]) {
      // Check pairs expanding outwards from this point
      let isReflection = true;
      for (
        let offset = 1;
        row - offset >= 0 && row + 1 + offset < numRows;
        offset++
      ) {
        if (rowStrings[row - offset] !== rowStrings[row + 1 + offset]) {
          isReflection = false;
          break;
        }
      }
      if (isReflection) {
        return { type: "horizontal", index: row };
      }
    }
  }

  // Create strings for each column
  const colStrings = Array(numCols)
    .fill("")
    .map((_, colIndex) => pattern.map((row) => row[colIndex]).join(""));

  // Check for vertical reflection
  for (let col = 0; col < numCols - 1; col++) {
    if (colStrings[col] === colStrings[col + 1]) {
      // Check pairs expanding outwards from this point
      let isReflection = true;
      for (
        let offset = 1;
        col - offset >= 0 && col + 1 + offset < numCols;
        offset++
      ) {
        if (colStrings[col - offset] !== colStrings[col + 1 + offset]) {
          isReflection = false;
          break;
        }
      }
      if (isReflection) {
        return { type: "vertical", index: col };
      }
    }
  }

  return null;
}

function calculateScore(reflectionLine) {
  // Input: {type: string, index: number}; ex: {type: "vertical", index: 3}
  // Output: number; ex: 3
  if (reflectionLine.type === "vertical") {
    // Score is the index of the vertical line (number of columns to the left)
    return reflectionLine.index + 1;
  } else if (reflectionLine.type === "horizontal") {
    // Score is 100 times the index of the horizontal line (number of rows above)
    // Increase the index by 1 to account for the top row
    const index = reflectionLine.index + 1;
    return 100 * index;
  }

  // If no reflection line, return 0 or handle as needed
  return 0;
}

function summarizePatterns(patterns) {
  // Input: Array<Array<string>>; ex: [["#",".","#","#",".",".","#","#","."],[".",".","#",".","#","#",".","#","."],["#","#",".",".",".",".",".","#"]]
  // Output: number; ex: 6
  return patterns.reduce((totalScore, pattern) => {
    const reflectionLine = findReflectionLine(pattern);
    if (reflectionLine) {
      return totalScore + calculateScore(reflectionLine);
    }
    return totalScore;
  }, 0);
}

// Part 1
function part1(lines) {
  const patterns = parseInput(lines);
  const totalScore = summarizePatterns(patterns);

  return totalScore;
}

// Part 2
function part2(lines) {
  const patterns = parseInput(lines);
  const totalScore = summarizePatterns(patterns);

  return totalScore;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  findReflectionLine,
  calculateScore,
  summarizePatterns,
};
