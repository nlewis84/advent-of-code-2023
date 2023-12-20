const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  const lines = input.split("\n");
  const directions = {
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
    U: [0, -1],
    0: [1, 0],
    1: [0, 1],
    2: [-1, 0],
    3: [0, -1],
  };

  return lines.map((line) => {
    const [direction, meters, _] = line.split(" ");
    return [directions[direction], parseInt(meters, 10)];
  });
}

function calculateLagoonCapacity(diggingSteps) {
  let currentPosition = 0;
  let totalCapacity = 1;

  for (const [direction, meters] of diggingSteps) {
    const [x, y] = direction;
    currentPosition += x * meters;
    totalCapacity += y * meters * currentPosition + meters / 2;
  }

  return totalCapacity;
}

// Part 1
function part1(lines) {
  const directions = parseInput(lines);
  const part1Result = calculateLagoonCapacity(directions);
  return part1Result;
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
  calculateLagoonCapacity,
};
