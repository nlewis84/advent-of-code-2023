const {
  part1,
  part2,
  parseInput,
  findReflectionLine,
  calculateScore,
  summarizePatterns,
} = require("../../../src/aoc2023/aoc13");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parseInput", () => {
  const input = `#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#`;

  expect(parseInput(input)).toEqual([
    [
      ["#", ".", "#", "#", ".", ".", "#", "#", "."],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      [".", ".", "#", "#", ".", ".", "#", "#", "."],
      ["#", ".", "#", ".", "#", "#", ".", "#", "."],
    ],
    [
      ["#", ".", ".", ".", "#", "#", ".", ".", "#"],
      ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
      [".", ".", "#", "#", ".", ".", "#", "#", "#"],
      ["#", "#", "#", "#", "#", ".", "#", "#", "."],
      ["#", "#", "#", "#", "#", ".", "#", "#", "."],
      [".", ".", "#", "#", ".", ".", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
    ],
  ]);
});

test("findReflectionLine", () => {
  const input = [
    [
      ["#", ".", "#", "#", ".", ".", "#", "#", "."],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      [".", ".", "#", "#", ".", ".", "#", "#", "."],
      ["#", ".", "#", ".", "#", "#", ".", "#", "."],
    ],
    [
      ["#", ".", ".", ".", "#", "#", ".", ".", "#"],
      ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
      [".", ".", "#", "#", ".", ".", "#", "#", "#"],
      ["#", "#", "#", "#", "#", ".", "#", "#", "."],
      ["#", "#", "#", "#", "#", ".", "#", "#", "."],
      [".", ".", "#", "#", ".", ".", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
    ],
  ];

  expect(findReflectionLine(input[0])).toEqual({
    type: "vertical",
    index: 4,
  });
  expect(findReflectionLine(input[1])).toEqual({
    type: "horizontal",
    index: 3,
  });
});

test("calculateScore", () => {
  const input = { type: "vertical", index: 4 };

  expect(calculateScore(input)).toEqual(5);

  const input2 = { type: "horizontal", index: 3 };

  expect(calculateScore(input2)).toEqual(400);
});

test("summarizePatterns", () => {
  const input = [
    [
      ["#", ".", "#", "#", ".", ".", "#", "#", "."],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      [".", ".", "#", "#", ".", ".", "#", "#", "."],
      ["#", ".", "#", ".", "#", "#", ".", "#", "."],
    ],
    [
      ["#", ".", ".", ".", "#", "#", ".", ".", "#"],
      ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
      [".", ".", "#", "#", ".", ".", "#", "#", "#"],
      ["#", "#", "#", "#", "#", ".", "#", "#", "."],
      ["#", "#", "#", "#", "#", ".", "#", "#", "."],
      [".", ".", "#", "#", ".", ".", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#", ".", ".", "#"],
    ],
  ];

  expect(summarizePatterns(input)).toEqual(405);
});

test("part2", () => {
  const input = [
    [
      ["#", ".", "#", "#", ".", ".", "#", "#", "."],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", "#", ".", "#", "#", ".", "#", "."],
      [".", ".", "#", "#", ".", ".", "#", "#", "."],
      ["#", ".", "#", ".", "#", "#", ".", "#", "."],
    ],
  ];

  expect(summarizePatterns(input, 1)).toEqual(300);
});
