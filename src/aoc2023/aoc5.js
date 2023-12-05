const { aoc_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  const lines = input.split("\n");
  const seeds = lines[0].split(": ")[1].split(" ").map(Number);

  const mappings = [];
  let currentMapping = [];

  lines.slice(1).forEach((line) => {
    if (line.includes("map:")) {
      if (currentMapping.length > 0) {
        mappings.push(currentMapping);
        currentMapping = [];
      }
    } else {
      const nums = line.split(" ").map(Number);
      if (nums.length === 3) {
        currentMapping.push(nums);
      }
    }
  });

  if (currentMapping.length > 0) {
    mappings.push(currentMapping);
  }

  return { seeds, mappings };
}

function mapNumber(number, mapping) {
  for (let [destStart, srcStart, length] of mapping) {
    if (number >= srcStart && number < srcStart + length) {
      return destStart + (number - srcStart);
    }
  }
  return number;
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
  mapNumber,
};
