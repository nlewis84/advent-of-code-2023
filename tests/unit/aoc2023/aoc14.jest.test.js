const {
  part1,
  part2,
  parseInput,
  calculateLoad,
} = require("../../../src/aoc2023/aoc14");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

// Test input
test("parseInput() works with test input", () => {
  const input = `O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....`;

  expect(parseInput(input)).toEqual([
    ["O", ".", ".", ".", ".", "#", ".", ".", ".", "."],
    ["O", ".", "O", "O", "#", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", "#", "#", ".", ".", "."],
    ["O", "O", ".", "#", "O", ".", ".", ".", ".", "O"],
    [".", "O", ".", ".", ".", ".", ".", "O", "#", "."],
    ["O", ".", "#", ".", ".", "O", ".", "#", ".", "#"],
    [".", ".", "O", ".", ".", "#", "O", ".", ".", "O"],
    [".", ".", ".", ".", ".", ".", ".", "O", ".", "."],
    ["#", ".", ".", ".", ".", "#", "#", "#", ".", "."],
    ["#", "O", "O", ".", ".", "#", ".", ".", ".", "."],
  ]);
});
