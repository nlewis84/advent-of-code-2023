const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions

// Part 1
function part1(input) {
  // Ensure input is an array of rows
  const rows = Array.isArray(input)
    ? input.map((line) => line.trim().split(/\s+/).map(Number))
    : input
        .trim()
        .split("\n")
        .map((line) => line.trim().split(/\s+/).map(Number));

  // Helper function to determine if a row is "Safe"
  function isSafeRow(row) {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < row.length; i++) {
      const diff = row[i] - row[i - 1];

      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        return false; // Unsafe if difference is out of range
      }

      if (diff > 0) {
        isDecreasing = false; // Not decreasing if there's an increase
      } else if (diff < 0) {
        isIncreasing = false; // Not increasing if there's a decrease
      }

      if (!isIncreasing && !isDecreasing) {
        return false; // Unsafe if trends switch
      }
    }

    const isSafe = isIncreasing || isDecreasing;
    return isSafe; // Safe if all conditions are met
  }

  // Count the number of safe rows
  const safeRows = rows.filter(isSafeRow);

  return safeRows.length;
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
};
