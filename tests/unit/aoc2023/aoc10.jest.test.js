const {
  part1,
  part2,
  parseInput,
  findStartPosition,
  replaceAdjacentTiles,
  findPaths,
} = require("../../../src/aoc2023/aoc10");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parseInput", () => {
  const input = `.....\n.S-7.\n.|.|.\n.L-J.\n.....`;
  const parsedInput = parseInput(input);
  expect(parsedInput).toEqual([
    [".", ".", ".", ".", "."],
    [".", "S", "-", "7", "."],
    [".", "|", ".", "|", "."],
    [".", "L", "-", "J", "."],
    [".", ".", ".", ".", "."],
  ]);
});

test("findStartPosition", () => {
  const input = `.....\n.S-7.\n.|.|.\n.L-J.\n.....`;
  const parsedInput = parseInput(input);
  const start = findStartPosition(parsedInput);
  expect(start).toEqual({ x: 1, y: 1 });
});

test("findPaths", () => {
  const input = `.....\n.S-7.\n.|.|.\n.L-J.\n.....`;
  const parsedInput = parseInput(input);
  const start = findStartPosition(parsedInput);
  const paths = findPaths(parsedInput, start);
  expect(paths).toEqual({
    "1,1": 0,
    "1,2": 1,
    "1,3": 2,
    "2,3": 3,
    "3,3": 4,
    "2,1": 1,
    "3,1": 2,
    "3,2": 3,
  });
});
