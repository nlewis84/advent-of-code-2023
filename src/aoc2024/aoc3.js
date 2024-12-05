const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function uncorrupt(input) {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.match(regex) || [];

  return matches;
}

// Function to sum the results of multiplications
function sumMultiplications(matches) {
  return matches.reduce((acc, match) => {
    const [x, y] = match.slice(4, -1).split(",").map(Number);
    return acc + x * y;
  }, 0);
}

function applyDoDontLogic(input) {
  const regex = /(?:do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))/g;
  const instructions = input.match(regex) || [];

  let isEnabled = true;
  const validInstructions = [];

  for (const instr of instructions) {
    if (instr === "do()") {
      isEnabled = true;
    } else if (instr === "don't()") {
      isEnabled = false;
    } else if (isEnabled && instr.startsWith("mul")) {
      validInstructions.push(instr);
    }
  }

  return validInstructions;
}

// Part 1
function part1(lines) {
  const input = lines;
  const matches = uncorrupt(input);
  return sumMultiplications(matches);
}

// Part 2
function part2(input) {
  const validInstructions = applyDoDontLogic(input);
  return sumMultiplications(validInstructions);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  uncorrupt,
  sumMultiplications,
  applyDoDontLogic,
  // other functions
};
