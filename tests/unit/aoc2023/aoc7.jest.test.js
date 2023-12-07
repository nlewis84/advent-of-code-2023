const {
  part1,
  part2,
  parseInput,
  determineType,
  determineHandType,
  determineBestHandWithJoker,
  part2DetermineType,
  determineHighCard,
  canFormHandType,
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

  const mockInput5 = [
    {
      hand: "AK72Q",
      bid: 42,
      type: "high card",
      highCard: "A",
      rank: 131,
    },
    {
      hand: "223K8",
      bid: 181,
      type: "one pair",
      highCard: "2",
      rank: 132,
    },
    {
      hand: "23A62",
      bid: 266,
      type: "one pair",
      highCard: "2",
      rank: 133,
    },
    {
      hand: "TJ486",
      bid: 181,
      type: "one pair",
      highCard: "T",
      rank: 134,
    },
    {
      hand: "J6K8Q",
      bid: 181,
      type: "one pair",
      highCard: "K",
      rank: 135,
    },
  ];

  expect(determineRank(mockInput5)).toEqual([
    {
      hand: "TJ486",
      bid: 181,
      type: "one pair",
      highCard: "T",
      rank: 5,
    },
    {
      hand: "23A62",
      bid: 266,
      type: "one pair",
      highCard: "2",
      rank: 4,
    },
    {
      hand: "223K8",
      bid: 181,
      type: "one pair",
      highCard: "2",
      rank: 3,
    },
    {
      hand: "J6K8Q",
      bid: 181,
      type: "one pair",
      highCard: "K",
      rank: 2,
    },
    {
      hand: "AK72Q",
      bid: 42,
      type: "high card",
      highCard: "A",
      rank: 1,
    },
  ]);
});

test("compareCards", () => {
  expect(compareCards("A", "K")).toEqual(-1);
  expect(compareCards("K", "A")).toEqual(1);
  expect(compareCards("A", "A")).toEqual(0);
});

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

test("determineHighCard", () => {
  const mockInput = {
    A: 2,
    K: 1,
    Q: 1,
    4: 1,
  };

  expect(determineHighCard(mockInput)).toEqual("A");
});

test("part2DetermineType", () => {
  // Input: array of objects; [ { hand: 7JK4T, bid: 765 }, { hand: AJJ83, bid: 684 } ]
  // Output: array of objects; [ { hand: 7JK4T, bid: 765, type: "one pair", highCard: "K" }, { hand: AJJ83, bid: 684, type: "three of a kind", highCard: "A" } ]
  const mockInput = [
    { hand: "7JK4T", bid: 765 },
    { hand: "AJJ83", bid: 684 },
  ];

  const mockInput2 = [
    { hand: "JJJJJ", bid: 765 },
    { hand: "AJJ83", bid: 684 },
  ];

  expect(part2DetermineType(mockInput)).toEqual([
    { hand: "7JK4T", bid: 765, type: "one pair", highCard: "K" },
    { hand: "AJJ83", bid: 684, type: "three of a kind", highCard: "A" },
  ]);

  expect(part2DetermineType(mockInput2)).toEqual([
    { hand: "JJJJJ", bid: 765, type: "five of a kind", highCard: "J" },
    { hand: "AJJ83", bid: 684, type: "three of a kind", highCard: "A" },
  ]);
});

test("determineBestHandWithJoker", () => {
  const mockInput = {
    A: 1,
    K: 1,
    Q: 1,
    4: 1,
    J: 1,
  };

  expect(determineBestHandWithJoker(mockInput)).toEqual({
    handType: "one pair",
    highCard: "A",
  });

  const mockInput2 = {
    9: 1,
    8: 1,
    J: 2,
  };

  expect(determineBestHandWithJoker(mockInput2)).toEqual({
    handType: "three of a kind",
    highCard: "9",
  });

  const mockInput3 = {
    Q: 2,
    7: 1,
    J: 2,
  };

  expect(determineBestHandWithJoker(mockInput3)).toEqual({
    handType: "four of a kind",
    highCard: "Q",
  });

  const mockInput4 = {
    T: 2,
    5: 1,
    J: 1,
  };

  expect(determineBestHandWithJoker(mockInput4)).toEqual({
    handType: "three of a kind",
    highCard: "T",
  });

  const mockInput5 = {
    K: 1,
    4: 1,
    J: 2,
  };

  expect(determineBestHandWithJoker(mockInput5)).toEqual({
    handType: "three of a kind",
    highCard: "K",
  });

  const mockInput6 = {
    A: 1,
    9: 1,
    6: 1,
    3: 1,
    J: 1,
  };

  expect(determineBestHandWithJoker(mockInput6)).toEqual({
    handType: "one pair",
    highCard: "A",
  });
});

test("determineBestHandWithJoker - Additional Tests", () => {
  // Jokers forming a full house
  const mockInputFullHouse = {
    J: 1,
    Q: 2,
    9: 2,
  };

  expect(determineBestHandWithJoker(mockInputFullHouse)).toEqual({
    handType: "full house",
    highCard: "Q",
  });

  // Multiple Jokers forming four of a kind
  const mockInputMultiJoker = {
    J: 2,
    A: 2,
    8: 1,
  };

  expect(determineBestHandWithJoker(mockInputMultiJoker)).toEqual({
    handType: "four of a kind",
    highCard: "A",
  });

  // Jokers with high cards
  const mockInputJokerHighCard = {
    J: 1,
    A: 1,
    K: 1,
    Q: 2,
  };

  expect(determineBestHandWithJoker(mockInputJokerHighCard)).toEqual({
    handType: "three of a kind",
    highCard: "A",
  });

  // Edge cases with ties
  const mockInputTies = {
    J: 1,
    A: 2,
    9: 2,
  };

  expect(determineBestHandWithJoker(mockInputTies)).toEqual({
    handType: "full house",
    highCard: "A",
  });

  // Hand without jokers
  const mockInputNoJoker = {
    A: 3,
    K: 1,
    Q: 1,
  };

  expect(determineBestHandWithJoker(mockInputNoJoker)).toEqual({
    handType: "three of a kind",
    highCard: "A",
  });

  // All jokers
  const mockInputAllJoker = {
    J: 5,
  };

  expect(determineBestHandWithJoker(mockInputAllJoker)).toEqual({
    handType: "five of a kind",
    highCard: "J",
  });

  const mockInputSingleCard = {
    J: 4,
    A: 1,
  };

  expect(determineBestHandWithJoker(mockInputSingleCard)).toEqual({
    handType: "five of a kind",
    highCard: "A",
  });
});

test("canFormHandType", () => {
  const counts = {
    A: 1,
    K: 1,
    4: 2,
  };
  const numberOfJokers = 2;

  expect(canFormHandType("three of a kind", counts, numberOfJokers)).toEqual(
    true
  );
  expect(canFormHandType("one pair", counts, numberOfJokers)).toEqual(true);
  expect(canFormHandType("two pair", counts, numberOfJokers)).toEqual(true);
  expect(canFormHandType("full house", counts, numberOfJokers)).toEqual(true);
  expect(canFormHandType("four of a kind", counts, numberOfJokers)).toEqual(
    true
  );
  expect(canFormHandType("five of a kind", counts, numberOfJokers)).toEqual(
    false
  );

  const countsNoJokers = {
    A: 2,
    K: 2,
    Q: 1,
  };

  expect(canFormHandType("three of a kind", countsNoJokers, 0)).toEqual(false);
  expect(canFormHandType("one pair", countsNoJokers, 0)).toEqual(true);
  expect(canFormHandType("two pair", countsNoJokers, 0)).toEqual(true);
  expect(canFormHandType("full house", countsNoJokers, 0)).toEqual(false);

  const countsFullHouse = {
    A: 3,
    K: 1,
  };
  const jokersFullHouse = 1;

  expect(
    canFormHandType("full house", countsFullHouse, jokersFullHouse)
  ).toEqual(true);

  const countsNotEnough = {
    A: 1,
    K: 1,
    Q: 1,
    T: 1,
  };
  const jokersNotEnough = 1;

  expect(
    canFormHandType("three of a kind", countsNotEnough, jokersNotEnough)
  ).toEqual(false);
  expect(canFormHandType("two pair", countsNotEnough, jokersNotEnough)).toEqual(
    false
  );
});
