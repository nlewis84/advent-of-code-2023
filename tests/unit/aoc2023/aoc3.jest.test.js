const {
  schematicToArray,
  isSymbol,
  isAdjacentToSymbol,
  findNumberGroups,
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

  expect(findNumberGroups(mockSchematic)).toEqual(expectedResult);
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
