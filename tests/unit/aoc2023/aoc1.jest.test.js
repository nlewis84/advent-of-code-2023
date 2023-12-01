const { part1 } = require("../../../src/aoc2023/aoc1");
const { test, expect } = require("@jest/globals");

test("part 1 processes lines correctly", () => {
  const mockLines = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

  const expectedResult = 142; // sum of combined digits
  expect(part1(mockLines)).toBe(expectedResult);
});
