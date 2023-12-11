const {
  part1,
  part2,
  processInputAndCalculateSum,
  backtrackToFindPreviousValue,
} = require("../../../src/aoc2023/aoc9");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("processInputAndCalculateSum", () => {
  const input = `0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45`;
  expect(processInputAndCalculateSum(input)).toBe(114);
});

test("backtrackToFindPreviousValue", () => {
  const sequences = [
    [0, 3, 6, 9, 12, 15],
    [1, 3, 6, 10, 15, 21],
    [10, 13, 16, 21, 30, 45],
  ];
  expect(backtrackToFindPreviousValue(sequences)).toStrictEqual([-3, 0, 5]);
});
