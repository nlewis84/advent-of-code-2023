const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions

// Part 1
function part1(input) {
  // Ensure input is an array of lines
  const lines = Array.isArray(input) ? input : input.trim().split("\n");

  // Map each line to a pair of numbers
  const pairs = lines.map((line) => line.trim().split(/\s+/).map(Number));

  // Extract the numbers in both columns
  const column1 = pairs.map((pair) => pair[0]);
  const column2 = pairs.map((pair) => pair[1]);

  // Sort each column independently
  const sortedColumn1 = column1.sort((a, b) => a - b);
  const sortedColumn2 = column2.sort((a, b) => a - b);

  // Combine the sorted columns into pairs
  const sortedPairs = sortedColumn1.map((value, index) => [
    value,
    sortedColumn2[index],
  ]);

  // Calculate the distance apart for each pair
  const distanceApart = sortedPairs.map(([a, b]) => Math.abs(a - b));

  // Sum the distances
  return distanceApart.reduce((acc, curr) => acc + curr, 0);
}

// Part 2
function part2(lines) {
  return 0;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_test_input, "utf-8").split("\n");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
};
