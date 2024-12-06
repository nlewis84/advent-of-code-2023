const {
  moveGuard,
  simulatePatrol,
  parseMap,
  countVisitedPositions,
  isLooping,
  part1,
  part2,
} = require("../../../src/aoc2024/aoc6");
const { test, expect } = require("@jest/globals");

test("parseMap correctly parses the input map", () => {
  const input = `
  ....#.....
  ....^....#
  ..........
  `;

  const result = parseMap(input);

  expect(result.grid).toEqual([
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ]);

  expect(result.guard).toEqual({ x: 4, y: 1, direction: "up" });
});

test("moveGuard moves guard correctly when no obstacle is ahead", () => {
  const grid = [
    [".", ".", ".", "#"],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
  ];

  const guard = { x: 2, y: 1, direction: "right" };
  const result = moveGuard(guard, grid);
  expect(result).toEqual({ x: 3, y: 1, direction: "right" });
});

test("moveGuard turns guard when obstacle is ahead", () => {
  const grid = [
    [".", ".", ".", "#"],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
  ];

  const guard = { x: 2, y: 0, direction: "right" };
  const result = moveGuard(guard, grid);
  expect(result).toEqual({ x: 2, y: 0, direction: "down" });
});

test("moveGuard returns null when guard exits map", () => {
  const grid = [
    [".", ".", ".", "#"],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
  ];

  const guard = { x: 3, y: 0, direction: "right" };
  const result = moveGuard(guard, grid);
  expect(result).toBeNull();
});

test("simulatePatrol tracks visited positions correctly", () => {
  const map = {
    grid: [
      [".", ".", ".", "#"],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
    ],
    guard: { x: 2, y: 1, direction: "right" },
  };

  const visited = simulatePatrol(map);
  expect(visited).toEqual(new Set(["2,1", "3,1"]));
});

test("countVisitedPositions counts distinct positions", () => {
  const visited = new Set(["1,1", "2,1", "1,1", "3,2"]);
  expect(countVisitedPositions(visited)).toBe(3);
});

test("Full simulation works for example input", () => {
  const input = `
  ....#.....
  ....^....#
  ..........
  `;

  const map = parseMap(input);
  const visited = simulatePatrol(map);
  const distinctPositions = countVisitedPositions(visited);

  expect(distinctPositions).toBe(6);
});

test("isLooping correctly identifies looping behavior", () => {
  const input = `
  ....#.....
  ....^....#
  ..........
  ........#.
  `;

  const map = parseMap(input);
  expect(isLooping(map.grid, map.guard, { x: 3, y: 2 })).toBe(true);
  expect(isLooping(map.grid, map.guard, { x: 0, y: 0 })).toBe(false);
});

test("part2 identifies all valid loop-causing positions", () => {
  const input = `
    ....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..^.....
    ........#.
    #.........
    ......#...
  `;

  expect(part2(input.trim().split("\n"))).toBe(6);
});
