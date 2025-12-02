const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function unwrapGiftRanges(input) {
  // Parse the comma-separated list of gift ranges
  // Split by commas and return array of range strings
  return input
    .split(",")
    .map((range) => range.trim())
    .filter((range) => range.length > 0);
}

function parseGiftRange(rangeString) {
  // Parse a single range string like "11-22" into start and end numbers
  const [start, end] = rangeString.split("-").map(Number);
  return { start, end };
}

function isRepeatingPattern(id) {
  // Check if an ID has a repeating pattern (digits repeated exactly twice)
  // Convert to string, check if length is even, then split in half and compare
  const idString = id.toString();

  // Must have even number of digits to be a repeating pattern
  if (idString.length % 2 !== 0) {
    return false;
  }

  // Split in half and check if both halves are identical
  const midpoint = idString.length / 2;
  const leftHalf = idString.substring(0, midpoint);
  const rightHalf = idString.substring(midpoint);

  return leftHalf === rightHalf;
}

function isRepeatingPatternAtLeastTwice(id) {
  // Check if an ID is made of a sequence repeated at least twice
  // Try different pattern lengths and see if the entire string can be made by repeating that pattern
  const idString = id.toString();

  // Try pattern lengths from 1 to half the string length
  // For example, "123123123" (length 9) can try patterns of length 1, 2, 3, or 4
  const maxPatternLength = Math.floor(idString.length / 2);

  for (
    let patternLength = 1;
    patternLength <= maxPatternLength;
    patternLength++
  ) {
    // Only try pattern lengths that evenly divide the string length
    // For example, if length is 9, we can try patterns of length 1, 3 (but not 2, 4)
    if (idString.length % patternLength !== 0) {
      continue;
    }

    // Extract the pattern from the beginning of the string
    const pattern = idString.substring(0, patternLength);

    // Calculate how many times the pattern should repeat
    const repeatCount = idString.length / patternLength;

    // Build the expected string by repeating the pattern
    const expectedString = pattern.repeat(repeatCount);

    // If it matches, we found a repeating pattern!
    if (expectedString === idString) {
      return true;
    }
  }

  // No repeating pattern found
  return false;
}

function findInvalidIdsInRange(start, end, isInvalidFn) {
  // Find all invalid IDs in the given range using the provided validation function
  // This allows us to use different pattern checking rules for Part 1 and Part 2
  const invalidIds = [];

  for (let id = start; id <= end; id++) {
    if (isInvalidFn(id)) {
      invalidIds.push(id);
    }
  }

  return invalidIds;
}

// Part 1
function part1(lines) {
  // Parse all gift ranges and find invalid product IDs
  // Sum up all the invalid IDs across all ranges
  let totalSum = 0;

  for (const line of lines) {
    const ranges = unwrapGiftRanges(line);

    for (const rangeString of ranges) {
      const { start, end } = parseGiftRange(rangeString);
      const invalidIds = findInvalidIdsInRange(start, end, isRepeatingPattern);

      // Sum up all invalid IDs from this range
      for (const id of invalidIds) {
        totalSum += id;
      }
    }
  }

  return totalSum;
}

// Part 2
function part2(lines) {
  // Parse all gift ranges and find invalid product IDs using the enhanced pattern checker
  // Sum up all the invalid IDs across all ranges
  let totalSum = 0;

  for (const line of lines) {
    const ranges = unwrapGiftRanges(line);

    for (const rangeString of ranges) {
      const { start, end } = parseGiftRange(rangeString);
      const invalidIds = findInvalidIdsInRange(
        start,
        end,
        isRepeatingPatternAtLeastTwice
      );

      // Sum up all invalid IDs from this range
      for (const id of invalidIds) {
        totalSum += id;
      }
    }
  }

  return totalSum;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  unwrapGiftRanges,
  parseGiftRange,
  isRepeatingPattern,
  isRepeatingPatternAtLeastTwice,
  findInvalidIdsInRange,
};
