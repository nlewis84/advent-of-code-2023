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

  const steps1 = lines.map((line) => {
    const [direction, meters, _] = line.split(" ");
    return [directions[direction], parseInt(meters, 10)];
  });

  const steps2 = lines.map((line) => {
    const colorCode = line.split(" ")[2];
    return [directions[colorCode[7]], parseInt(colorCode.substring(2, 7), 16)];
  });

  return [steps1, steps2];
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
  const [steps1] = parseInput(lines);
  const part1Result = calculateLagoonCapacity(steps1);
  return [part1Result];
}

// Part 2
function part2(lines) {
  const [_, steps2] = parseInput(lines);
  const part2Result = calculateLagoonCapacity(steps2);
  return [part2Result];
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
  calculateLagoonCapacity,
};
