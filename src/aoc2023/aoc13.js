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
  // Input: Array<string>; ex: ["#",".","#","#",".",".","#","#","."]
  // Output: {type: string, index: number}; ex: {type: "vertical", index: 3}
}

function isPatternSymmetric(pattern, reflectionLine) {
  // Implementation: Compare the segments of the pattern based on the reflection line.
  // Input: Array<string>; ex: ["#",".","#","#",".",".","#","#","."]
  // Input: {type: string, index: number}; ex: {type: "vertical", index: 3}
  // Output: boolean; ex: true
}

/**
 * Calculates the score based on the reflection line.
 * @param {{type: string, index: number}} reflectionLine - The reflection line information.
 * @return {number} The calculated score.
 */
function calculateScore(reflectionLine) {
  // Input: {type: string, index: number}; ex: {type: "vertical", index: 3}
  // Output: number; ex: 3
}

function summarizePatterns(patterns) {
  // Input: Array<Array<string>>; ex: [["#",".","#","#",".",".","#","#","."],[".",".","#",".","#","#",".","#","."],["#","#",".",".",".",".",".","#"]]
  // Output: number; ex: 6
}

function main() {
  // 1. Read the input.
  // 2. Parse the input using parseInput.
  // 3. Iterate over each pattern, process them, and calculate the total score using summarizePatterns.
  // 4. Output the final result.
}

// Part 1
function part1(lines) {
  return 0;
}

// Part 2
function part2(lines) {
  return 0;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
};
