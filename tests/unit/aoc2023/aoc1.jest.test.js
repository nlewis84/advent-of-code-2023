const {
  part1,
  part2,
  convertSpelledOutToDigits,
  calculateCombinedDigitSum,
} = require("../../../src/aoc2023/aoc1");
const { test, expect } = require("@jest/globals");

test("part 1 processes lines correctly", () => {
  const mockLines = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

  const expectedResult = 142; // sum of combined digits
  expect(part1(mockLines)).toBe(expectedResult);
});

test("calculateCombinedDigitSum calculates the sum of combined digits in a line", () => {
  const mockLines = [
    "219",
    "823",
    "abc123xyz",
    "x2134",
    "49872",
    "z18234",
    "7pqrst6teen",
  ];

  const expectedResult = [29, 83, 13, 24, 42, 14, 76];
  expect(mockLines.map((line) => calculateCombinedDigitSum(line))).toEqual(
    expectedResult
  );
});

test("convertSpelledOutToDigits converts spelled out numbers to digits", () => {
  const mockLines = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
  ];

  const expectedResult = [
    "t2o1n9e",
    "e8t2ot3e",
    "abco1e2t3exyz",
    "xt2o1e3f4r",
    "4n9ee8ts7n2",
    "zo1e8t234",
    "7pqrsts6xteen",
  ];

  expect(mockLines.map((line) => convertSpelledOutToDigits(line))).toEqual(
    expectedResult
  );
});

test("part 2 processes lines correctly", () => {
  const mockLines = [
    "two1nine", // 29
    "eightwothree", // 83
    "abcone2threexyz", // 13
    "xtwone3four", // 24
    "4nineeightseven2", // 42
    "zoneight234", // 14
    "7pqrstsixteen", // 76
  ];

  const expectedResult = 29 + 83 + 13 + 24 + 42 + 14 + 76; // sum of combined digits
  expect(part2(mockLines)).toBe(expectedResult);
});
