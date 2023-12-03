const {
  schematicToArray,
  isSymbol,
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

test("findNumberGroups returns an array of number groups", () => {
  const mockSchematic = [
    ["1", "2", "3"],
    [".", ".", "*"],
    [".", "4", "5"],
  ];

  const expectedResult = [
    {
      number: "123",
      positions: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    },
    {
      number: "45",
      positions: [
        [2, 1],
        [2, 2],
      ],
    },
  ];

  expect(findNumberGroups(mockSchematic)).toEqual(expectedResult);
});
