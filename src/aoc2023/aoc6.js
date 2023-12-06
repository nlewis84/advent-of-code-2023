const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  // Input: String containing race times and distances
  // Output: Array of tuples; ex: [[7, 9], [15, 40], [30, 200]]
  let lines = input.split("\n");
  let timeStr = lines[0];
  let distanceStr = lines[1];

  let times = timeStr.match(/\d+/g).map(Number);
  let distances = distanceStr.match(/\d+/g).map(Number);

  let races = times.map((time, index) => [time, distances[index]]);

  return races;
}

function winningWays(time, record) {
  // Input: time: Number, record: Number; ex: 7, 9
  // Output: Number; ex: 4
  let ways = 0;

  for (let holdTime = 0; holdTime <= time; holdTime++) {
    let travelTime = time - holdTime;
    let distance = holdTime * travelTime;

    if (distance > record) {
      ways++;
    }
  }

  return ways;
}

function calculateWinningWays(races) {
  // Input: Array of tuples; ex: [[7, 9], [15, 40], [30, 200]]
  // Output: Number; ex: 288
  let product = 1;

  for (let race of races) {
    let [time, record] = race;
    product *= winningWays(time, record);
  }

  return product;
}

function fixBadKerning(numbers) {
  // Input: Array of numbers; ex: [7, 15, 30]
  // Output: Array of number; [71530] <-this is dumb and an artifact from part 1

  let fixed = [];
  let current = "";
  for (let number of numbers) {
    current = `${current}${number}`;
  }
  fixed.push(Number(current));

  return fixed;
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
const lines = fs.readFileSync(aoc_test_input, "utf-8");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  winningWays,
  calculateWinningWays,
  fixBadKerning,
};
