const {
  parseInput,
  isValidUpdate,
  getMiddlePage,
  calculateMiddleSum,
  calculateReorderedMiddleSum,
  reorderUpdate,
  part1,
  part2,
} = require("../../../src/aoc2024/aoc5");
const { test, expect } = require("@jest/globals");

describe("Manual Printer Tests", () => {
  const rules = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ];

  const updates = [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ];

  test("parseInput correctly parses rules and updates", () => {
    const input = `47|53\n97|13\n\n75,47,61,53,29\n97,61,53,29,13`;
    const parsed = parseInput(input);
    expect(parsed.rules).toEqual([
      [47, 53],
      [97, 13],
    ]);
    expect(parsed.updates).toEqual([
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
    ]);
  });

  test("isValidUpdate validates update correctly", () => {
    expect(isValidUpdate(updates[0], rules)).toBe(true); // Valid
    expect(isValidUpdate(updates[3], rules)).toBe(false); // Invalid
  });

  test("getMiddlePage returns the middle page", () => {
    expect(getMiddlePage(updates[0])).toBe(61);
    expect(getMiddlePage(updates[2])).toBe(29);
  });

  test("calculateMiddleSum sums middle pages of valid updates", () => {
    expect(calculateMiddleSum(rules, updates)).toBe(143);
  });

  test("reorderUpdate reorders pages correctly", () => {
    expect(reorderUpdate(updates[3], rules)).toEqual([97, 75, 47, 61, 53]);
    expect(reorderUpdate(updates[4], rules)).toEqual([61, 29, 13]);
    expect(reorderUpdate(updates[5], rules)).toEqual([97, 75, 47, 29, 13]);
  });

  test("calculateReorderedMiddleSum sums middle pages of reordered updates", () => {
    expect(calculateReorderedMiddleSum(rules, updates)).toBe(123);
  });
});
