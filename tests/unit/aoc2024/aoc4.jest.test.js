const {
  getDirectionVectors,
  isWordInDirection,
  findOccurrences,
  findCenters,
  part1,
  part2,
} = require("../../../src/aoc2024/aoc4");
const { test, expect } = require("@jest/globals");

test("getDirectionVectors returns all 8 directions", () => {
  const directions = getDirectionVectors();
  expect(directions).toEqual([
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ]);
});

test("isWordInDirection detects words correctly", () => {
  const grid = ["XMAS", "....", "....", "...."].map((row) => row.split(""));

  expect(isWordInDirection(grid, "XMAS", 0, 0, [0, 1])).toBe(true); // Horizontal Right
  expect(isWordInDirection(grid, "XMAS", 0, 0, [1, 0])).toBe(false); // Vertical Down
});

test("findOccurrences counts words correctly in a small grid", () => {
  const grid = ["XMAS", "....", "XMAS", "...."].map((row) => row.split(""));

  expect(findOccurrences(grid, "XMAS")).toBe(2);
});

test("findOccurrences counts diagonal words", () => {
  const grid = ["X...", ".M..", "..A.", "...S"].map((row) => row.split(""));

  expect(findOccurrences(grid, "XMAS")).toBe(1);
});

test("findCenters locates all centers (A)", () => {
  const grid = [".M.M.", "..A..", ".S.S."].map((row) => row.split(""));

  expect(findCenters(grid)).toEqual([[1, 2]]);
});

test("part2 counts X-MAS patterns with reused functions", () => {
  const lines = [".M.M.", "..A..", ".S.S.", ".....", ".M.M.", "..A..", ".S.S."];

  expect(part2(lines)).toBe(2);
});
