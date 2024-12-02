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

test("part 2 processes lines correctly", () => {
  const mockLines = `3   4
4   3
2   5
1   3
3   9
3   3`;

  // Put all the left column values into an array
  const column1 = [3, 4, 2, 1, 3, 3];
  const column2 = [4, 3, 5, 3, 9, 3];

  // Check to see how many times each value in the left column appears in the right column and then multiple the left column value by that count
  const expectedResult = column1.reduce(
    (acc, curr) =>
      acc + column2.filter((value) => value === curr).length * curr,
    0
  );

  // Add up the results
  // Expect the result to be 3 * 3 + 4 * 1 + 2 * 0 + 1 * 0 + 3 * 3 + 3 * 3 = 31
  expect(part2(mockLines)).toBe(expectedResult);
});
