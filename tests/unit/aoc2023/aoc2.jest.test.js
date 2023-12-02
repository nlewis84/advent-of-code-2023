const {
  part1,
  part2,
  parseGameData,
  calculateMaxCubesPerColor,
  isGamePossible,
  sumPossibleGameIds,
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

test("isGamePossible", () => {
  const mockGame = { blue: 3, red: 4, green: 2 };
  const mockMaxCubesPerColor = { blue: 6, red: 4, green: 2 };

  expect(isGamePossible(mockGame, mockMaxCubesPerColor)).toBe(true);
});

test("sumPossibleGameIds", () => {
  const mockData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
  const mockMaxCubesPerColor = { blue: 14, red: 12, green: 13 };

  expect(sumPossibleGameIds(mockData, mockMaxCubesPerColor)).toBe(8);
});
