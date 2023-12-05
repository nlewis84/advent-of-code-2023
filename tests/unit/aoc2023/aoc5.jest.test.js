const {
  part1,
  part2,
  parseInput,
  mapNumber,
} = require("../../../src/aoc2023/aoc4");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parseInput parses the input correctly", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");

  const expectedResult = [
    "seeds: 79 14 55 13",
    "seed-to-soil map:",
    "50 98 2",
    "52 50 48",
    "soil-to-fertilizer map:",
    "0 15 37",
    "37 52 2",
    "39 0 15",
    "fertilizer-to-water map:",
    "49 53 8",
    "0 11 42",
    "42 0 7",
    "57 7 4",
    "water-to-light map:",
    "88 18 7",
    "18 25 70",
    "light-to-temperature map:",
    "45 77 23",
    "81 45 19",
    "68 64 13",
    "temperature-to-humidity map:",
    "0 69 1",
    "1 0 69",
    "humidity-to-location map:",
    "60 56 37",
    "56 93 4",
  ];

  expect(parseInput(mockInput)).toEqual(expectedResult);
});

test("mapNumber maps numbers correctly", () => {
  const mockNumber = 100;
  const mockMapping = [
    [0, 0, 50],
    [50, 50, 50],
    [100, 100, 50],
  ];

  expect(mapNumber(mockNumber, mockMapping)).toBe(150);
});
