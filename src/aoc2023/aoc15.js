const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  // Input: string; ex: "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
  // Output: Array<string>; ex: [ "rn=1", "cm-", "qp=3", "cm=2", "qp-", "pc=4", "ot=9", "ab=5", "pc-", "pc=6", "ot=7" ]
  return input.replace(/\n+/g, "").split(",");
}

function determineASCIICode(character) {
  // Input: string; ex: "H"
  // Output: number; ex: 72
  return character.charCodeAt(0);
}

function multiplyBy17(number) {
  // Input: number; ex: 100
  // Output: number; ex: 1700
  return number * 17;
}

function findRemainderOfDivision(number, divisor) {
  // Input: number; ex: 4148
  // Input: number; ex: 256
  // Output: number; ex: 52
  return number % divisor;
}

function solve(input) {
  // Input: string; ex: "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
  // Output: number; ex: 1320
  const commands = parseInput(input);
  // sum up all commands
  let commandSum = 0;
  for (let command of commands) {
    // for each command, determine the ASCII code, increase the current value by that amount, multiply the current value by 17, and find the remainder of dividing the current value by 256
    let currentValue = 0;
    console.log(command);
    for (let character of command) {
      currentValue += determineASCIICode(character);
      currentValue = multiplyBy17(currentValue);
      currentValue = findRemainderOfDivision(currentValue, 256);
    }
    commandSum += currentValue;
  }

  return commandSum;
}

// Part 1
function part1(lines) {
  const solution = solve(lines);
  return solution;
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
  determineASCIICode,
  multiplyBy17,
  findRemainderOfDivision,
  solve,
};
