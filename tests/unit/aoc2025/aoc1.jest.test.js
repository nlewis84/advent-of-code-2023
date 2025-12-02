const {
  part1,
  part2,
  unwrapElfNote,
  spinTheDial,
  followElfDirection,
  countZerosSpinningLeft,
  countZerosSpinningRight,
  countZerosWhileSpinning,
  isAtTheNorthPole,
} = require("../../../src/aoc2025/aoc1");
const { test, expect } = require("@jest/globals");

// Tests for unwrapElfNote
test("unwrapElfNote parses R56 correctly", () => {
  const result = unwrapElfNote("R56");
  expect(result.direction).toBe("R");
  expect(result.amount).toBe(56);
});

test("unwrapElfNote parses L30 correctly", () => {
  const result = unwrapElfNote("L30");
  expect(result.direction).toBe("L");
  expect(result.amount).toBe(30);
});

// Tests for isAtTheNorthPole
test("isAtTheNorthPole returns true for 0", () => {
  expect(isAtTheNorthPole(0)).toBe(true);
});

test("isAtTheNorthPole returns false for non-zero", () => {
  expect(isAtTheNorthPole(50)).toBe(false);
  expect(isAtTheNorthPole(99)).toBe(false);
});

// Tests for spinTheDial
test("spinTheDial R8 increases the number by 8", () => {
  const result = spinTheDial("R8", 11);
  expect(result).toBe(19); // 11 + 8 = 19
});

test("spinTheDial L19 decreases the number by 19", () => {
  const result = spinTheDial("L19", 19);
  expect(result).toBe(0); // 19 - 19 = 0
});

test("spinTheDial wraps around when going left from 0", () => {
  const result = spinTheDial("L1", 0);
  expect(result).toBe(99); // 0 - 1 wraps to 99
});

test("spinTheDial wraps around when going right from 99", () => {
  const result = spinTheDial("R1", 99);
  expect(result).toBe(0); // 99 + 1 wraps to 0
});

test("spinTheDial L10 from 5 wraps to 95", () => {
  const result = spinTheDial("L10", 5);
  expect(result).toBe(95); // 5 - 10 = -5, wraps to 95
});

// Tests for followElfDirection
test("followElfDirection R8 increases the number and returns false for equalsStartingNumber", () => {
  const result = followElfDirection("R8", 11);
  expect(result.newNumber).toBe(19);
  expect(result.equalsStartingNumber).toBe(false);
});

test("followElfDirection L19 from 19 returns 0 and false for equalsStartingNumber", () => {
  const result = followElfDirection("L19", 19);
  expect(result.newNumber).toBe(0);
  expect(result.equalsStartingNumber).toBe(false);
});

test("followElfDirection R0 returns the same number and true for equalsStartingNumber", () => {
  const result = followElfDirection("R0", 50);
  expect(result.newNumber).toBe(50);
  expect(result.equalsStartingNumber).toBe(true);
});

// Tests for countZerosSpinningLeft
test("countZerosSpinningLeft: L52 from 50 counts 1", () => {
  const result = countZerosSpinningLeft(50, 52);
  expect(result).toBe(1); // At step 50, position is 0
});

test("countZerosSpinningLeft: L17 from 2 counts 1", () => {
  const result = countZerosSpinningLeft(2, 17);
  expect(result).toBe(1); // At step 2, position is 0
});

test("countZerosSpinningLeft: L10 from 50 counts 0", () => {
  const result = countZerosSpinningLeft(50, 10);
  expect(result).toBe(0); // Doesn't reach 0
});

// Tests for countZerosSpinningRight
test("countZerosSpinningRight: R50 from 50 counts 0 (ends at 0, not during)", () => {
  const result = countZerosSpinningRight(50, 50);
  expect(result).toBe(0); // Ends at 0, but not during
});

test("countZerosSpinningRight: R60 from 95 counts 1", () => {
  const result = countZerosSpinningRight(95, 60);
  expect(result).toBe(1); // At step 5, position is 0
});

test("countZerosSpinningRight: R24 from 83 counts 1", () => {
  const result = countZerosSpinningRight(83, 24);
  expect(result).toBe(1); // At step 17, position is 0
});

test("countZerosSpinningRight: R1000 from 50 counts 10", () => {
  const result = countZerosSpinningRight(50, 1000);
  expect(result).toBe(10); // Passes 0 ten times during rotation
});

// Tests for countZerosWhileSpinning
test("countZerosWhileSpinning: L52 from 50 counts 1", () => {
  const result = countZerosWhileSpinning("L52", 50);
  expect(result).toBe(1);
});

test("countZerosWhileSpinning: R60 from 95 counts 1", () => {
  const result = countZerosWhileSpinning("R60", 95);
  expect(result).toBe(1);
});

test("countZerosWhileSpinning: R10 from 50 counts 0", () => {
  const result = countZerosWhileSpinning("R10", 50);
  expect(result).toBe(0);
});

// Tests for part 1
test("part 1 returns the number of times dial points at 0", () => {
  // Example from problem description
  const mockLines = [
    "L68",
    "L30",
    "R48",
    "L5",
    "R60",
    "L55",
    "L1",
    "L99",
    "R14",
    "L82",
  ];
  const result = part1(mockLines);
  expect(result).toBe(3); // Should hit 0 three times
});

// Tests for part 2 - counts how many times dial points at 0 (during and at end)
test("part 2 counts passing over 0: L52 from 50 passes over 0 once", () => {
  const mockLines = ["L52"];
  const result = part2(mockLines);
  expect(result).toBe(1); // 50 -> ... -> 0 -> 99 -> 98, passes 0 once
});

test("part 2 counts passing over 0: L52 and R2", () => {
  // L52 from 50: at 0 during step 50 (counts)
  // R2 from 98: ends at 0 (also counts now)
  const mockLines = ["L52", "R2"];
  const result = part2(mockLines);
  expect(result).toBe(2); // L52 has 0 during, R2 ends at 0
});

test("part 2 counts passing over 0: R50 from 50", () => {
  // R50 from 50: ends at 0 (counts)
  const mockLines = ["R50"];
  const result = part2(mockLines);
  expect(result).toBe(1); // Ends at 0, counts
});

test("part 2 counts: goes from 2 to 85 by turning left", () => {
  // To simulate going from 2 to 85: L17 from 2 would do this
  // But starting from 50, we need L65 to get to 85, and it passes through 0
  // Actually, let's test L65 from 50: 50 -> ... -> 0 -> ... -> 85
  const mockLines = ["L65"];
  const result = part2(mockLines);
  expect(result).toBe(1); // Passes 0 during rotation (at step 50)
});

test("part 2 counts: 83 to 7 turning right", () => {
  // To simulate going from 83 to 7: R24 from 83 would do this
  // But starting from 50, we need R57 to get to 7, and it passes through 0
  // Actually, let's test: from 50, what gets us to 7? 50 + x = 7 (mod 100) => x = 57 (mod 100)
  // R57 from 50: 50 -> ... -> 99 -> 0 -> ... -> 7, passes 0 during
  const mockLines = ["R57"];
  const result = part2(mockLines);
  expect(result).toBe(1); // Passes 0 during rotation (at step 50)
});

test("part 2 counts: 60 to 0 turning left", () => {
  // L60 from 60: ends at 0, but we start at 50
  // From 50, L50 ends at 0
  const mockLines = ["L50"];
  const result = part2(mockLines);
  expect(result).toBe(1); // Ends at 0, counts
});

test("part 2 counts: 60 to 0 turning right", () => {
  // R40 from 60: ends at 0, but we start at 50
  // From 50, R50 ends at 0
  const mockLines = ["R50"];
  const result = part2(mockLines);
  expect(result).toBe(1); // Ends at 0, counts
});

test("part 2 counts passing over 0: instruction that doesn't pass 0 returns 0", () => {
  const mockLines = ["R10"];
  const result = part2(mockLines);
  expect(result).toBe(0); // 50 -> 60, doesn't pass 0
});

test("part 2 counts passing over 0: R1000 from 50 passes over 0 ten times", () => {
  const mockLines = ["R1000"];
  const result = part2(mockLines);
  expect(result).toBe(10); // 50 + 1000 = 1050, crosses 0 ten times (50->99->0->...->50)
});

test("part 2 counts: example sequence points at 0 six times total", () => {
  // Same example as part 1
  // During: L68 (step 50), R60 (step 5), L82 (step 14) = 3
  // At end: R48, L55, L99 = 3
  // Total: 6
  const mockLines = [
    "L68",
    "L30",
    "R48",
    "L5",
    "R60",
    "L55",
    "L1",
    "L99",
    "R14",
    "L82",
  ];
  const result = part2(mockLines);
  expect(result).toBe(6); // Should point at 0 six times total (3 during + 3 at end)
});
