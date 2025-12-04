const {
  part1,
  part2,
  findTwoHighestSingleDigitNumbers,
  findTwelveHighestSingleDigitNumbers,
  sumOfNumbers,
} = require("../../../src/aoc2025/aoc3");
const { test, expect } = require("@jest/globals");

// Tests for findTwoHighestSingleDigitNumbers
test("findTwoHighestSingleDigitNumbers: 987654321111111 returns 98", () => {
  const result = findTwoHighestSingleDigitNumbers("987654321111111");
  expect(result).toBe("98");
});

test("findTwoHighestSingleDigitNumbers: 811111111111119 returns 89", () => {
  const result = findTwoHighestSingleDigitNumbers("811111111111119");
  expect(result).toBe("89");
});

test("findTwoHighestSingleDigitNumbers: 234234234234278 returns 78", () => {
  const result = findTwoHighestSingleDigitNumbers("234234234234278");
  expect(result).toBe("78");
});

test("findTwoHighestSingleDigitNumbers: 818181911112111 returns 92", () => {
  const result = findTwoHighestSingleDigitNumbers("818181911112111");
  expect(result).toBe("92");
});

// Tests for findTwelveHighestSingleDigitNumbers
test("findTwelveHighestSingleDigitNumbers: 987654321111111 returns 987654321111", () => {
  const result = findTwelveHighestSingleDigitNumbers("987654321111111");
  expect(result).toBe("987654321111");
});

test("findTwelveHighestSingleDigitNumbers: 811111111111119 returns 811111111119", () => {
  const result = findTwelveHighestSingleDigitNumbers("811111111111119");
  expect(result).toBe("811111111119");
});

test("findTwelveHighestSingleDigitNumbers: 234234234234278 returns 434234234278", () => {
  const result = findTwelveHighestSingleDigitNumbers("234234234234278");
  expect(result).toBe("434234234278");
});

test("findTwelveHighestSingleDigitNumbers: 818181911112111 returns 888911112111", () => {
  const result = findTwelveHighestSingleDigitNumbers("818181911112111");
  expect(result).toBe("888911112111");
});

// Tests for sumOfNumbers
test("sumOfNumbers: sums array of number strings", () => {
  const result = sumOfNumbers(["98", "89", "78", "92"]);
  expect(result).toBe(357); // 98 + 89 + 78 + 92 = 357
});

// Placeholder tests - update these once you implement the solution
test("part 1 placeholder", () => {
  const mockLines = [];
  const result = part1(mockLines);
  expect(result).toBe(0);
});

test("part 2 placeholder", () => {
  const mockLines = [];
  const result = part2(mockLines);
  expect(result).toBe(0);
});
