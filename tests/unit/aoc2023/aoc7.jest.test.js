const {
  part1,
  part2,
  parseInput,
  determineType,
  determineHandType,
  compareCards,
  determineRank,
  calculateTotalWinnings,
} = require("../../../src/aoc2023/aoc7");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parseInput", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");

  expect(parseInput(mockInput)).toEqual([
    { hand: "32T3K", bid: 765 },
    { hand: "T55J5", bid: 684 },
    { hand: "KK677", bid: 28 },
    { hand: "KTJJT", bid: 220 },
    { hand: "QQQJA", bid: 483 },
  ]);
});

test("determineType", () => {
  // Input: array of objects; [ { hand: 72A4T, bid: 765 }, { hand: AAA83, bid: 684 } ]
  // Output: array of objects; [ { hand: 72A4T, bid: 765, type: "high card", highCard: "A" }, { hand: AAA83, bid: 684, type: "three of a kind", highCard: "A" } ]
  const mockInput = [
    { hand: "72A4T", bid: 765 },
    { hand: "AAA83", bid: 684 },
  ];

  expect(determineType(mockInput)).toEqual([
    { hand: "72A4T", bid: 765, type: "high card", highCard: "A" },
    { hand: "AAA83", bid: 684, type: "three of a kind", highCard: "A" },
  ]);
});

test("determineHandType", () => {
  const mockInput = [
    ["A", 3],
    ["K", 1],
    ["Q", 1],
    ["J", 1],
  ];

  expect(determineHandType(mockInput)).toEqual("three of a kind");
});

test("determineRank", () => {
  const mockInput = [
    { hand: "KK227", bid: 765, type: "two pair", highCard: "K" },
    { hand: "KK337", bid: 684, type: "two pair", highCard: "K" },
  ];

  expect(determineRank(mockInput)).toEqual([
    { hand: "KK337", bid: 684, type: "two pair", highCard: "K", rank: 2 },
    { hand: "KK227", bid: 765, type: "two pair", highCard: "K", rank: 1 },
  ]);

  const mockInput2 = [
    { hand: "QQQ33", bid: 765, type: "full house", highCard: "A" },
    { hand: "Q33QQ", bid: 5, type: "full house", highCard: "A" },
  ];

  expect(determineRank(mockInput2)).toEqual([
    { hand: "QQQ33", bid: 765, type: "full house", highCard: "A", rank: 2 },
    { hand: "Q33QQ", bid: 5, type: "full house", highCard: "A", rank: 1 },
  ]);

  const mockInput3 = [
    { hand: "72A4T", bid: 765, type: "high card", highCard: "A" },
    { hand: "88AAA", bid: 684, type: "full house", highCard: "A" },
    { hand: "KK677", bid: 28, type: "two pair", highCard: "K" },
    { hand: "TTJJT", bid: 220, type: "full house", highCard: "J" },
    { hand: "QQQQA", bid: 483, type: "four of a kind", highCard: "Q" },
  ];

  expect(determineRank(mockInput3)).toEqual([
    { hand: "QQQQA", bid: 483, type: "four of a kind", highCard: "Q", rank: 5 },
    { hand: "TTJJT", bid: 220, type: "full house", highCard: "J", rank: 4 },
    { hand: "88AAA", bid: 684, type: "full house", highCard: "A", rank: 3 },
    { hand: "KK677", bid: 28, type: "two pair", highCard: "K", rank: 2 },
    { hand: "72A4T", bid: 765, type: "high card", highCard: "A", rank: 1 },
  ]);

  const mockInput4 = [
    { hand: "AATTA", bid: 28, type: "full house", highCard: "A" },
    { hand: "222K2", bid: 3, type: "four of a kind", highCard: "2" },
    { hand: "22223", bid: 227, type: "four of a kind", highCard: "2" },
    { hand: "AATTT", bid: 603, type: "full house", highCard: "T" },
    { hand: "22522", bid: 249, type: "four of a kind", highCard: "2" },
    { hand: "22228", bid: 492, type: "four of a kind", highCard: "2" },
    { hand: "22922", bid: 755, type: "four of a kind", highCard: "2" },
  ];

  expect(determineRank(mockInput4)).toEqual([
    { hand: "22922", bid: 755, type: "four of a kind", highCard: "2", rank: 7 },
    { hand: "22522", bid: 249, type: "four of a kind", highCard: "2", rank: 6 },
    { hand: "222K2", bid: 3, type: "four of a kind", highCard: "2", rank: 5 },
    { hand: "22228", bid: 492, type: "four of a kind", highCard: "2", rank: 4 },
    { hand: "22223", bid: 227, type: "four of a kind", highCard: "2", rank: 3 },
    { hand: "AATTA", bid: 28, type: "full house", highCard: "A", rank: 2 },
    { hand: "AATTT", bid: 603, type: "full house", highCard: "T", rank: 1 },
  ]);
});

// test("compareCards", () => {
//   expect(compareCards("A", "K")).toEqual(-1);
//   expect(compareCards("K", "A")).toEqual(1);
//   expect(compareCards("A", "A")).toEqual(0);
// });

test("calculateTotalWinnings", () => {
  const mockInput = [
    { hand: "72A4T", bid: 765, type: "high card", highCard: "A", rank: 5 },
    { hand: "88AAA", bid: 684, type: "full house", highCard: "A", rank: 2 },
    { hand: "KK677", bid: 28, type: "two pair", highCard: "K", rank: 4 },
    { hand: "TTJJT", bid: 220, type: "full house", highCard: "J", rank: 3 },
    { hand: "QQQQA", bid: 483, type: "four of a kind", highCard: "Q", rank: 1 },
  ];

  expect(calculateTotalWinnings(mockInput)).toEqual(
    483 + 220 * 3 + 28 * 4 + 684 * 2 + 765 * 5
  );

  const mockInput2 = [
    { hand: "22922", bid: 755, type: "four of a kind", highCard: "2", rank: 7 },
    { hand: "22522", bid: 249, type: "four of a kind", highCard: "2", rank: 6 },
    { hand: "222K2", bid: 3, type: "four of a kind", highCard: "2", rank: 5 },
    { hand: "22228", bid: 492, type: "four of a kind", highCard: "2", rank: 4 },
    { hand: "22223", bid: 227, type: "four of a kind", highCard: "2", rank: 3 },
    { hand: "AATTA", bid: 28, type: "full house", highCard: "A", rank: 2 },
    { hand: "AATTT", bid: 603, type: "full house", highCard: "T", rank: 1 },
  ];

  expect(calculateTotalWinnings(mockInput2)).toEqual(10102);
});
