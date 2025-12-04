const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
// take a string of numbers, find the two highest single digit number, then return a string of the two numbers in order they were found in the original string
function findTwoHighestSingleDigitNumbers(string) {
  const numbers = string.match(/\d/g).map(Number);

  let maxValue = 0;
  let maxPair = [0, 0];

  // try all pairs (i, j) where i < j
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const twoDigitValue = numbers[i] * 10 + numbers[j];
      if (twoDigitValue > maxValue) {
        maxValue = twoDigitValue;
        maxPair = [numbers[i], numbers[j]];
      }
    }
  }

  return `${maxPair[0]}${maxPair[1]}`;
}

// find the 12 digits that form the largest possible number (by removing digits strategically)
function findTwelveHighestSingleDigitNumbers(string) {
  const numbers = string.match(/\d/g).map(Number);
  const targetLength = 12;
  const toRemove = numbers.length - targetLength;

  if (toRemove <= 0) {
    return numbers.join("");
  }

  // keep track of digits we're keeping
  const stack = [];

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i];
    // While we can still remove digits and current digit is larger than top of stack
    while (
      stack.length > 0 &&
      stack[stack.length - 1] < current &&
      numbers.length - i + stack.length > targetLength
    ) {
      stack.pop();
    }

    // Only push if we haven't reached the limit
    if (stack.length < targetLength) {
      stack.push(current);
    }
  }

  return stack.join("");
}

// sum of an array of several strings of numbers
function sumOfNumbers(numbers) {
  return numbers.reduce((acc, curr) => acc + parseInt(curr), 0);
}

// Part 1
function part1(lines) {
  return sumOfNumbers(lines.map(findTwoHighestSingleDigitNumbers));
}

// Part 2
function part2(lines) {
  return sumOfNumbers(lines.map(findTwelveHighestSingleDigitNumbers));
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  findTwoHighestSingleDigitNumbers,
  findTwelveHighestSingleDigitNumbers,
  sumOfNumbers,
};
