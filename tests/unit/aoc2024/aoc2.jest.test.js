const { part1, part2 } = require("../../../src/aoc2024/aoc2");
const { test, expect } = require("@jest/globals");

test("part 1 processes lines correctly", () => {
  const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  // Each row (report) is Safe if each number (level) is either increasing or decreasing and each level is differs by at least one and at most three
  // The first row is safe
  // The second row is unsafe because 2 to 7 is an increase of 5
  // The third row is unsafe because 6 to 2 is a decrease of 4
  // The fourth row is unsafe because this report starts by increasing, but then decreases from 3 to 2
  // The fifth report is unsafe because each level must either increase or decrease by 1, but 4 to 4 is not a change
  // The sixth report is safe

  const numberOfSafeReports = 2;

  expect(part1(testInput)).toBe(numberOfSafeReports);
});

test("part 2 processes lines correctly", () => {
  // works the same as part 1, but it can accept a single BAD level (number) in a report (row)
  // The first row is safe
  // The 2nd row is unsafe even with removing a bad level
  // The 3rd row is unsafe even with removing a bad level
  // The 4th row is safe with removing a bad level (3)
  // The 5th row is safe with removing a bad level (4)
  // The 6th row is safe

  const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  const numberOfSafeReports = 4;

  expect(part2(testInput)).toBe(numberOfSafeReports);
});
