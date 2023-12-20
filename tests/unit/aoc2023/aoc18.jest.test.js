const {
  part1,
  part2,
  parseInput,
  calculateLagoonCapacity,
} = require("../../../src/aoc2023/aoc18");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parseInput", () => {
  const input = `R 6 (#70c710)\nD 5 (#0dc571)\nL 2 (#5713f0)\nD 2 (#d2c081)\nR 2 (#59c680)\nD 2 (#411b91)\nL 5 (#8ceee2)\nU 2 (#caa173)\nL 1 (#1b58a2)\nU 2 (#caa171)\nR 2 (#7807d2)\nU 3 (#a77fa3)\nL 2 (#015232)\nU 2 (#7a21e3)`;

  const expected = [
    [
      [[1, 0], 6],
      [[0, 1], 5],
      [[-1, 0], 2],
      [[0, 1], 2],
      [[1, 0], 2],
      [[0, 1], 2],
      [[-1, 0], 5],
      [[0, -1], 2],
      [[-1, 0], 1],
      [[0, -1], 2],
      [[1, 0], 2],
      [[0, -1], 3],
      [[-1, 0], 2],
      [[0, -1], 2],
    ],
    [
      [[1, 0], 461937],
      [[0, 1], 56407],
      [[1, 0], 356671],
      [[0, 1], 863240],
      [[1, 0], 367720],
      [[0, 1], 266681],
      [[-1, 0], 577262],
      [[0, -1], 829975],
      [[-1, 0], 112010],
      [[0, 1], 829975],
      [[-1, 0], 491645],
      [[0, -1], 686074],
      [[-1, 0], 5411],
      [[0, -1], 500254],
    ],
  ];

  expect(parseInput(input)).toEqual(expected);
});

test("calculateLagoonCapacity", () => {
  const input = [
    [[1, 0], 6],
    [[0, 1], 5],
    [[-1, 0], 2],
    [[0, 1], 2],
    [[1, 0], 2],
    [[0, 1], 2],
    [[-1, 0], 5],
    [[0, -1], 2],
    [[-1, 0], 1],
    [[0, -1], 2],
    [[1, 0], 2],
    [[0, -1], 3],
    [[-1, 0], 2],
    [[0, -1], 2],
  ];

  expect(calculateLagoonCapacity(input)).toEqual(62);
});
