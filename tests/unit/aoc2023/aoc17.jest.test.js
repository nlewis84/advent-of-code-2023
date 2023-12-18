const {
  part1,
  part2,
  parseInput,
  findShortestPath,
  createPosition,
  addPositions,
  isValidPosition,
  getMoves,
} = require("../../../src/aoc2023/aoc17");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parseInput", () => {
  const input = `2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533`;
  const expected = {
    goal: { x: 12, y: 12 },
    start: { x: 0, y: 0 },
    grid: [
      [2, 4, 1, 3, 4, 3, 2, 3, 1, 1, 3, 2, 3],
      [3, 2, 1, 5, 4, 5, 3, 5, 3, 5, 6, 2, 3],
      [3, 2, 5, 5, 2, 4, 5, 6, 5, 4, 2, 5, 4],
      [3, 4, 4, 6, 5, 8, 5, 8, 4, 5, 4, 5, 2],
      [4, 5, 4, 6, 6, 5, 7, 8, 6, 7, 5, 3, 6],
      [1, 4, 3, 8, 5, 9, 8, 7, 9, 8, 4, 5, 4],
      [4, 4, 5, 7, 8, 7, 6, 9, 8, 7, 7, 6, 6],
      [3, 6, 3, 7, 8, 7, 7, 9, 7, 9, 6, 5, 3],
      [4, 6, 5, 4, 9, 6, 7, 9, 8, 6, 8, 8, 7],
      [4, 5, 6, 4, 6, 7, 9, 9, 8, 6, 4, 5, 3],
      [1, 2, 2, 4, 6, 8, 6, 8, 6, 5, 5, 6, 3],
      [2, 5, 4, 6, 5, 4, 8, 8, 8, 7, 7, 3, 5],
      [4, 3, 2, 2, 6, 7, 4, 6, 5, 5, 5, 3, 3],
    ],
  };

  expect(parseInput(input)).toEqual(expected);
});

test("findShortestPath", () => {
  const input = `2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533`;
  const { grid, start, goal } = parseInput(input);

  const expected = 102;

  expect(findShortestPath(grid, start, goal, 3, 0)).toEqual(expected);
});

test("createPosition", () => {
  const expected = { x: 1, y: 2 };

  expect(createPosition(1, 2)).toEqual(expected);
});

test("addPositions", () => {
  const expected = { x: 2, y: 4 };

  expect(addPositions({ x: 1, y: 2 }, { x: 1, y: 2 })).toEqual(expected);
});

test("isValidPosition", () => {
  // check to see if the position is within the grid that is 13x13
  const { grid } = parseInput(
    `2413432311323\n3215453535623\n3255245654254\n3446585845452\n4546657867536\n1438598798454\n4457876987766\n3637877979653\n4654967986887\n4564679986453\n1224686865563\n2546548887735\n4322674655533`
  );

  expect(isValidPosition({ x: 0, y: 0 }, grid)).toEqual(true);
  expect(isValidPosition({ x: 11, y: 11 }, grid)).toEqual(true);
  expect(isValidPosition({ x: 0, y: 12 }, grid)).toEqual(true);
  expect(isValidPosition({ x: 12, y: 0 }, grid)).toEqual(true);
  expect(isValidPosition({ x: 12, y: 12 }, grid)).toEqual(true);
  expect(isValidPosition({ x: -1, y: -1 }, grid)).toEqual(false);
  expect(isValidPosition({ x: 0, y: 14 }, grid)).toEqual(false);
  expect(isValidPosition({ x: 14, y: 0 }, grid)).toEqual(false);
});

test("getMoves", () => {
  const expected = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  expect(getMoves()).toEqual(expected);
});
