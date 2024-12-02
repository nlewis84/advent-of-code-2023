const { part1, part2 } = require("../../../src/aoc2024/aoc1");
const { test, expect } = require("@jest/globals");

test("part 1 processes lines correctly", () => {
  const mockLines = `3   4
4   3
2   5
1   3
3   9
3   3`;

  const sortedLines = [
    ["1", "3"],
    ["2", "3"],
    ["3", "3"],
    ["3", "4"],
    ["3", "5"],
    ["4", "9"],
  ];

  const distanceApart = sortedLines.map((line) => Math.abs(line[0] - line[1]));

  const expectedResult = distanceApart.reduce((acc, curr) => acc + curr, 0);
  expect(part1(mockLines)).toBe(expectedResult);
});
