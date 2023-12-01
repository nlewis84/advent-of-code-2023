const { aoc_input } = require("../../config");
const fs = require("fs");

// Part 1
// On each line, return the first and last number and combine them to make a new 2 digit number
// Add all these numbers together

function part1(lines) {
  let total = 0;

  for (const line of lines) {
    const numbers = line.match(/\d+/g);
    if (numbers) {
      const firstDigit = numbers[0].toString();
      const lastDigit = numbers[numbers.length - 1].toString();
      const combinedDigits = parseInt(firstDigit + lastDigit);

      total += combinedDigits;
    }
  }

  return total;
}

// Reading from file and running part1
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
console.log(part1(lines));

module.exports = { part1 };
