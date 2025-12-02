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

  // Apply the operation (R = increase, L = decrease)
  // Dial wraps around 0-99, so use modulo 100
  let newNumber;
  if (direction === "R") {
    newNumber = currentNumber + amount;
  } else if (direction === "L") {
    newNumber = currentNumber - amount;
  } else {
    return currentNumber;
  }

  // Modulo 100, and handle negative numbers
  return ((newNumber % 100) + 100) % 100;
}

function followElfDirection(instruction, startingNumber) {
  // Process the instruction and get the new number
  const newNumber = spinTheDial(instruction, startingNumber);

  // Check if new number equals starting number
  const equalsStartingNumber = newNumber === startingNumber;

  // Return object with newNumber and equalsStartingNumber
  return {
    newNumber: newNumber,
    equalsStartingNumber: equalsStartingNumber,
  };
}

function countZerosSpinningLeft(startPos, amount) {
  let count = 0;
  // Going left: we're at 0 when (startPos - i) mod 100 = 0 for i in [1, amount-1]
  // This means i ≡ startPos (mod 100)
  // First occurrence: i0 = startPos (if startPos > 0 and startPos < amount)
  // Then i = startPos + k*100 for k such that 1 ≤ i ≤ amount-1
  for (let i = startPos; i < amount; i += 100) {
    if (i > 0 && i < amount) {
      // Check if this position would be at 0
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
  // Going right: we're at 0 when (startPos + i) mod 100 = 0 for i in [1, amount-1]
  // This means i ≡ -startPos (mod 100), i.e., i ≡ (100 - startPos) mod 100
  // First occurrence: i0 = (100 - startPos) mod 100 (if > 0, else 100)
  let firstZero = (100 - (startPos % 100)) % 100;
  if (firstZero === 0) firstZero = 100;

  // Count all occurrences: firstZero, firstZero + 100, firstZero + 200, ... up to amount-1
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

  // Process each instruction
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

  // Process each instruction
  for (const line of lines) {
    if (line.trim() === "") continue; // Skip empty lines

    const startPos = currentNumber;

    // Count how many times the dial is at 0 DURING the rotation
    pointsAtZeroDuring += countZerosWhileSpinning(line, startPos);

    // Update current number after instruction
    currentNumber = spinTheDial(line, currentNumber);

    // Also count if the dial ends at 0 (at the end of rotation)
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
  followElfDirection,
  countZerosSpinningLeft,
  countZerosSpinningRight,
  countZerosWhileSpinning,
  isAtTheNorthPole,
};
