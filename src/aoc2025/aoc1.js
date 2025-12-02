const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function unwrapElfNote(instruction) {
  const direction = instruction[0];
  const amount = parseInt(instruction.substring(1), 10);
  return { direction, amount };
}

function spinTheDial(instruction, currentNumber) {
  const { direction, amount } = unwrapElfNote(instruction);

  // Spin the dial: R means turn increase, L means turn decrease
  // The dial wraps around, so going past 99 loops back to 0, and going below 0 loops to 99
  let newNumber;
  if (direction === "R") {
    newNumber = currentNumber + amount;
  } else if (direction === "L") {
    newNumber = currentNumber - amount;
  } else {
    return currentNumber;
  }

  // Modulo 100 and handle negative numbers
  return ((newNumber % 100) + 100) % 100;
}

function countZerosSpinningLeft(startPos, amount) {
  let count = 0;
  // When spinning left, we'll pass through the North Pole (0) at certain steps
  // We check every 100 steps starting from our starting position
  // For example, if we start at 50 and spin left 52 clicks, we'll hit 0 at step 50
  for (let i = startPos; i < amount; i += 100) {
    if (i > 0 && i < amount) {
      // Calculate where we'd be at this step and see if we're at the North Pole
      const pos = (((startPos - i) % 100) + 100) % 100;
      if (pos === 0) {
        count++;
      }
    }
  }
  return count;
}

function countZerosSpinningRight(startPos, amount) {
  let count = 0;
  // When spinning right, we'll pass through the North Pole (0) at certain steps
  // First, figure out how many clicks it takes to reach 0 from our starting position
  // For example, if we start at 95, it takes 5 clicks to reach 0
  let firstZero = (100 - (startPos % 100)) % 100;
  if (firstZero === 0) firstZero = 100;

  // Then count every time we'd hit 0 during the spin (every 100 clicks after the first)
  // So if we spin 1000 clicks from 50, we'll hit 0 at steps 50, 150, 250, ... 950
  for (let i = firstZero; i < amount; i += 100) {
    if (i > 0 && i < amount) {
      count++;
    }
  }
  return count;
}

function countZerosWhileSpinning(instruction, startPos) {
  const { direction, amount } = unwrapElfNote(instruction);

  if (direction === "L") {
    return countZerosSpinningLeft(startPos, amount);
  } else if (direction === "R") {
    return countZerosSpinningRight(startPos, amount);
  }
  return 0;
}

function isAtTheNorthPole(position) {
  return position === 0;
}

// Part 1
function part1(lines) {
  const startingNumber = 50;
  let currentNumber = startingNumber;
  let dialPointsAtZero = 0;

  // Follow each elf instruction and count how many times we end up at the North Pole
  for (const line of lines) {
    currentNumber = spinTheDial(line, currentNumber);
    if (isAtTheNorthPole(currentNumber)) {
      dialPointsAtZero++;
    }
  }
  return dialPointsAtZero;
}

// Part 2
function part2(lines) {
  const startingNumber = 50;
  let currentNumber = startingNumber;
  let pointsAtZeroDuring = 0;

  // Follow each elf instruction and count ALL times we're at the North Pole
  // This includes both during the spin AND at the end of each spin
  for (const line of lines) {
    const startPos = currentNumber;

    // Count how many times we pass through the North Pole while spinning
    pointsAtZeroDuring += countZerosWhileSpinning(line, startPos);

    // Complete the spin and see where we end up
    currentNumber = spinTheDial(line, currentNumber);

    // If we end up at the North Pole, count that too
    if (isAtTheNorthPole(currentNumber)) {
      pointsAtZeroDuring++;
    }
  }

  return pointsAtZeroDuring;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  unwrapElfNote,
  spinTheDial,
  countZerosSpinningLeft,
  countZerosSpinningRight,
  countZerosWhileSpinning,
  isAtTheNorthPole,
};
