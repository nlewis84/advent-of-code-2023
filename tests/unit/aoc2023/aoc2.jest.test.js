const {
  part1,
  part2,
  parseGameData,
  calculateMaxCubesPerColor,
} = require("../../../src/aoc2023/aoc2");
const { test, expect } = require("@jest/globals");

test("parseGameData", () => {
  const mockData = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

  const expectedResult = [
    { blue: 3, red: 4 },
    { red: 1, green: 2, blue: 6 },
    { green: 2 },
  ];

  expect(parseGameData(mockData)).toEqual(expectedResult);
});

test("calculateMaxCubesPerColor", () => {
  const mockData = [
    { blue: 3, red: 4 },
    { red: 1, green: 2, blue: 6 },
    { green: 2 },
  ];

  const expectedResult = { blue: 6, red: 4, green: 2 };

  expect(calculateMaxCubesPerColor(mockData)).toEqual(expectedResult);
});
