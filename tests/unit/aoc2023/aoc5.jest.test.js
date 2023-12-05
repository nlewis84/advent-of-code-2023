const {
  part1,
  part2,
  parseInput,
  mapNumber,
  findLowestLocation,
  part2ParseInput,
} = require("../../../src/aoc2023/aoc5");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parseInput parses the input correctly", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");

  const expectedResult = {
    mappings: [
      [
        [50, 98, 2],
        [52, 50, 48],
      ],
      [
        [0, 15, 37],
        [37, 52, 2],
        [39, 0, 15],
      ],
      [
        [49, 53, 8],
        [0, 11, 42],
        [42, 0, 7],
        [57, 7, 4],
      ],
      [
        [88, 18, 7],
        [18, 25, 70],
      ],
      [
        [45, 77, 23],
        [81, 45, 19],
        [68, 64, 13],
      ],
      [
        [0, 69, 1],
        [1, 0, 69],
      ],
      [
        [60, 56, 37],
        [56, 93, 4],
      ],
    ],
    seeds: [79, 14, 55, 13],
  };

  expect(parseInput(mockInput)).toEqual(expectedResult);
});

test("mapNumber maps numbers correctly", () => {
  const mockNumber = 0;
  const mockNumber2 = 50;
  const mockNumber3 = 51;
  const mockNumber4 = 98;
  const mockMapping = [
    [50, 98, 2],
    [52, 50, 48],
  ];

  expect(mapNumber(mockNumber, mockMapping)).toBe(0);
  expect(mapNumber(mockNumber2, mockMapping)).toBe(52);
  expect(mapNumber(mockNumber3, mockMapping)).toBe(53);
  expect(mapNumber(mockNumber4, mockMapping)).toBe(50);
});

test("findLowestLocation finds the lowest location", () => {
  const mockSeeds = [79, 14, 55, 13];
  const mockMappings = [
    [
      [50, 98, 2],
      [52, 50, 48],
    ],
    [
      [0, 15, 37],
      [37, 52, 2],
      [39, 0, 15],
    ],
    [
      [49, 53, 8],
      [0, 11, 42],
      [42, 0, 7],
      [57, 7, 4],
    ],
    [
      [88, 18, 7],
      [18, 25, 70],
    ],
    [
      [45, 77, 23],
      [81, 45, 19],
      [68, 64, 13],
    ],
    [
      [0, 69, 1],
      [1, 0, 69],
    ],
    [
      [60, 56, 37],
      [56, 93, 4],
    ],
  ];

  expect(findLowestLocation(mockSeeds, mockMappings)).toStrictEqual([
    82, 43, 86, 35,
  ]);
});

test("part2ParseInput parses the input correctly", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");

  const expectedResult = {
    mappings: [
      [
        [50, 98, 2],
        [52, 50, 48],
      ],
      [
        [0, 15, 37],
        [37, 52, 2],
        [39, 0, 15],
      ],
      [
        [49, 53, 8],
        [0, 11, 42],
        [42, 0, 7],
        [57, 7, 4],
      ],
      [
        [88, 18, 7],
        [18, 25, 70],
      ],
      [
        [45, 77, 23],
        [81, 45, 19],
        [68, 64, 13],
      ],
      [
        [0, 69, 1],
        [1, 0, 69],
      ],
      [
        [60, 56, 37],
        [56, 93, 4],
      ],
    ],
    seeds: [
      79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 55, 56, 57, 58,
      59, 60, 61, 62, 63, 64, 65, 66, 67,
    ],
  };

  expect(part2ParseInput(mockInput)).toEqual(expectedResult);
});

test("part2 processes lines correctly", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");

  expect(part2(mockInput)).toBe(46);
});
