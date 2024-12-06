const {
  moveGuard,
  simulatePatrol,
  parseMap,
  countVisitedPositions,
  detectLoop,
  findObstructionCandidates,
  simulateWithObstruction,
  findLoopObstructionPositions,
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

test("findLoopObstructionPositions finds correct obstructions", () => {
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
  const map = parseMap(input);
  const loopPositions = findLoopObstructionPositions(map);

  // Validate the correct number of obstructions
  expect(loopPositions.length).toBe(6);
});

test("detectLoop identifies a simple loop", () => {
  const path = [
    { position: "1,1", direction: "up" },
    { position: "1,2", direction: "up" },
    { position: "1,3", direction: "right" },
    { position: "1,1", direction: "up" },
    { position: "1,2", direction: "up" },
    { position: "1,3", direction: "right" },
  ];

  expect(detectLoop(path)).toBe(true);
});

test("detectLoop does not falsely detect a loop with stalls", () => {
  const path = [
    { position: "1,1", direction: "up" },
    { position: "1,2", direction: "up" },
    { position: "1,3", direction: "right" },
    { position: "1,3", direction: "down" }, // Stalls at same position
    { position: "1,2", direction: "down" },
  ];

  expect(detectLoop(path)).toBe(false);
});

test("simulateWithObstruction detects a loop caused by an obstruction", () => {
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

  const map = parseMap(input);
  const obstruction = { x: 1, y: 8 }; // Place an obstruction that causes a loop
  const path = simulateWithObstruction(map, obstruction);

  expect(detectLoop(path)).toBe(true);
});

test("simulateWithObstruction identifies no loop with no obstruction", () => {
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

  const map = parseMap(input);
  const obstruction = { x: 9, y: 9 }; // Place an obstruction that does not cause a loop
  const path = simulateWithObstruction(map, obstruction);

  expect(detectLoop(path)).toBe(false);
});

test("findObstructionCandidates returns correct candidates", () => {
  const grid = [
    [".", ".", ".", "#"],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
  ];

  const guard = { x: 1, y: 1, direction: "right" };
  const candidates = findObstructionCandidates(grid, guard);

  expect(candidates).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ]);
});

test("findLoopObstructionPositions finds correct obstructions", () => {
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
  const map = parseMap(input);
  const loopPositions = findLoopObstructionPositions(map);

  // Replace with actual observed positions
  expect(loopPositions).toEqual([
    { x: 3, y: 6 },
    { x: 6, y: 7 },
    { x: 7, y: 7 },
    { x: 1, y: 8 },
    { x: 3, y: 8 },
    { x: 7, y: 9 },
  ]);
});
