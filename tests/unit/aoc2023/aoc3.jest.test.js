const {
  schematicToArray,
  isSymbol,
  isGear,
  calculateGearRatio,
  isAdjacentToSymbol,
  findNumberGroups,
  getAdjacentRatios,
} = require("../../../src/aoc2023/aoc3");
const { test, expect } = require("@jest/globals");

test("schematicToArray converts a schematic to an array", () => {
  const mockSchematic = "123\n..*\n...";

  const expectedResult = [
    ["1", "2", "3"],
    [".", ".", "*"],
    [".", ".", "."],
  ];

  expect(schematicToArray(mockSchematic)).toEqual(expectedResult);
});

test("isSymbol returns true if cell is a symbol", () => {
  const mockCell = "1";

  expect(isSymbol(mockCell)).toBe(false);
  expect(isSymbol(".")).toBe(false);
  expect(isSymbol("a")).toBe(false);
  expect(isSymbol("&")).toBe(true);
  expect(isSymbol("#")).toBe(true);
  expect(isSymbol("$")).toBe(true);
});

test("findNumberGroups returns an array of objects", () => {
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const mockSchematic2 = schematicToArray(input);

  const mockSchematic = [
    ["1", "2", "3"],
    [".", ".", "*"],
    ["4", ".", "5"],
  ];

  const expectedResult = [
    {
      adjacentToSymbol: true,
      number: "123",
      positions: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "5",
      positions: [[2, 2]],
    },
  ];

  const expectedResult2 = [
    {
      adjacentToSymbol: true,
      number: "467",
      positions: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "35",
      positions: [
        [2, 2],
        [2, 3],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "633",
      positions: [
        [2, 6],
        [2, 7],
        [2, 8],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "617",
      positions: [
        [4, 0],
        [4, 1],
        [4, 2],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "592",
      positions: [
        [6, 2],
        [6, 3],
        [6, 4],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "755",
      positions: [
        [7, 6],
        [7, 7],
        [7, 8],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "664",
      positions: [
        [9, 1],
        [9, 2],
        [9, 3],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "598",
      positions: [
        [9, 5],
        [9, 6],
        [9, 7],
      ],
    },
  ];

  expect(findNumberGroups(mockSchematic)).toEqual(expectedResult);
  expect(findNumberGroups(mockSchematic2)).toEqual(expectedResult2);
});

test("isAdjacentToSymbol returns true if cell is adjacent to a symbol", () => {
  const mockSchematic = [
    ["1", "2", "3"],
    [".", ".", "*"],
    ["4", ".", "5"],
  ];

  expect(isAdjacentToSymbol(mockSchematic, 0, 0)).toBe(false);
  expect(isAdjacentToSymbol(mockSchematic, 0, 1)).toBe(true);
  expect(isAdjacentToSymbol(mockSchematic, 0, 2)).toBe(true);
  expect(isAdjacentToSymbol(mockSchematic, 1, 0)).toBe(false);
  expect(isAdjacentToSymbol(mockSchematic, 1, 1)).toBe(true);
  expect(isAdjacentToSymbol(mockSchematic, 1, 2)).toBe(false);
  expect(isAdjacentToSymbol(mockSchematic, 2, 0)).toBe(false);
  expect(isAdjacentToSymbol(mockSchematic, 2, 1)).toBe(true);
  expect(isAdjacentToSymbol(mockSchematic, 2, 2)).toBe(true);
});

test("isGear returns true if cell is a gear", () => {
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const mockSchematic2 = schematicToArray(input);
  const mockSchematic = [
    [".", ".", "7", "3"],
    ["$", ".", ".", "%"],
    ["4", ".", "1", "0"],
  ];

  const numberGroups = findNumberGroups(mockSchematic);
  const numberGroups2 = findNumberGroups(mockSchematic2);

  expect(isGear(mockSchematic, numberGroups, 0, 0)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 0, 1)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 0, 2)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 0, 3)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 1, 0)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 1, 1)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 1, 2)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 1, 3)).toBe(true);
  expect(isGear(mockSchematic, numberGroups, 2, 0)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 2, 1)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 2, 2)).toBe(false);
  expect(isGear(mockSchematic, numberGroups, 2, 3)).toBe(false);
  expect(isGear(mockSchematic2, numberGroups2, 0, 3)).toBe(false);
  expect(isGear(mockSchematic2, numberGroups2, 2, 6)).toBe(false);
  expect(isGear(mockSchematic2, numberGroups2, 3, 3)).toBe(false);
  expect(isGear(mockSchematic2, numberGroups2, 4, 5)).toBe(false);
  expect(isGear(mockSchematic2, numberGroups2, 8, 3)).toBe(false);
  expect(isGear(mockSchematic2, numberGroups2, 8, 5)).toBe(true);
});

test("calculateGearRatio returns the gear ratio", () => {
  const mockSchematic = [73, 10];

  expect(calculateGearRatio(mockSchematic)).toBe(730);
});

test("getAdjacentRatios returns an array of part numbers", () => {
  const mockNumberGroups = [
    {
      adjacentToSymbol: true,
      number: "73",
      positions: [
        [0, 2],
        [0, 3],
      ],
    },
    {
      adjacentToSymbol: true,
      number: "10",
      positions: [
        [2, 2],
        [2, 3],
      ],
    },
  ];

  const mockGearRow = 1;
  const mockGearCol = 3;

  const expectedResult = [73, 10];

  expect(getAdjacentRatios(mockNumberGroups, mockGearRow, mockGearCol)).toEqual(
    expectedResult
  );
});
