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
