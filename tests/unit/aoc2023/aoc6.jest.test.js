const {
  part1,
  part2,
  parseInput,
  winningWays,
  calculateWinningWays,
  fixBadKerning,
} = require("../../../src/aoc2023/aoc6");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

const testInput = `Time:      7  15   30
Distance:  9  40  200`;

const realInput = `Time:        45     97     72     95
Distance:   305   1062   1110   1695`;

const part2TestInput = `Time:      71530
Distance:  940200`;

test("parseInput", () => {
  expect(parseInput(testInput)).toEqual([
    [7, 9],
    [15, 40],
    [30, 200],
  ]);
  expect(parseInput(realInput)).toEqual([
    [45, 305],
    [97, 1062],
    [72, 1110],
    [95, 1695],
  ]);
  expect(parseInput(part2TestInput)).toEqual([[71530, 940200]]);
});

test("winningWays", () => {
  expect(winningWays(7, 9)).toBe(4);
  expect(winningWays(15, 40)).toBe(8);
  expect(winningWays(30, 200)).toBe(9);
  expect(winningWays(45, 305)).toBe(28);
  expect(winningWays(97, 1062)).toBe(72);
  expect(winningWays(72, 1110)).toBe(27);
  expect(winningWays(95, 1695)).toBe(48);
  expect(winningWays(71530, 940200)).toBe(71503);
  expect(winningWays(45977295, 305106211101695)).toBe(29891250);
});

test("calculateWinningWays", () => {
  expect(
    calculateWinningWays([
      [7, 9],
      [15, 40],
      [30, 200],
    ])
  ).toBe(288);
  expect(
    calculateWinningWays([
      [45, 305],
      [97, 1062],
      [72, 1110],
      [95, 1695],
    ])
  ).toBe(2612736);
  expect(calculateWinningWays([[45977295, 305106211101695]])).toBe(29891250);
});

test("fixBadKerning", () => {
  expect(fixBadKerning([7, 15, 30])).toEqual([71530]);
  expect(fixBadKerning([45, 97, 72, 95])).toEqual([45977295]);
  expect(fixBadKerning([305, 1062, 1110, 1695])).toEqual([305106211101695]);
});
