const { aoc_input } = require("../../config");
const fs = require("fs");

// Helper function to convert spelled-out numbers to digits
function convertSpelledOutToDigits(line) {
  const SPELLED_OUT_NUMBERS = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };

  let numbers = line;

  for (const [key, value] of Object.entries(SPELLED_OUT_NUMBERS)) {
    numbers = numbers.replace(new RegExp(key, "g"), value);
  }

  return numbers;
}

// Helper function to calculate the sum of combined digits in a line
function calculateCombinedDigitSum(line) {
  const digits = line.match(/\d/g);

  if (!digits) return 0;

  const firstDigit = digits[0].toString();
  const lastDigit = digits[digits.length - 1].toString();
  const combinedDigits = parseInt(firstDigit + lastDigit);

  return combinedDigits;
}

// Part 1
function part1(lines) {
  let total = 0;

  for (const line of lines) {
    const numbers = convertSpelledOutToDigits(line);
    const combinedDigits = calculateCombinedDigitSum(numbers);

    total += combinedDigits;
  }

  return total;
}

// Part 2
function part2(lines) {
  let total = 0;

  for (const line of lines) {
    const numbers = convertSpelledOutToDigits(line);
    const combinedDigits = calculateCombinedDigitSum(numbers);

    total += combinedDigits;
  }

  return total;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  convertSpelledOutToDigits,
  calculateCombinedDigitSum,
};
