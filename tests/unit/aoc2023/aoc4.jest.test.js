const {
  sumScratchcards,
  calculatePointsForWinningNumbers,
  checkForWinningNumbers,
  parseCard,
  parseInput,
  part1,
} = require("../../../src/aoc2023/aoc4");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("sumScratchcards sums the numbers in an array", () => {
  const mockArray = [1, 2, 3, 4, 5];

  expect(sumScratchcards(mockArray)).toBe(15);
});

test("calculatePointsForWinningNumbers calculates the points for winning numbers", () => {
  const mockArray = [1, 2, 3, 4, 5, 6, 7, 8];

  expect(calculatePointsForWinningNumbers(mockArray)).toBe(128);
});

test("checkForWinningNumbers returns an array of winning numbers", () => {
  const mockWinningNumbers = [41, 48, 83, 86, 17];
  const mockMyNumbers = [83, 86, 6, 31, 17, 9, 48, 53];

  expect(checkForWinningNumbers(mockWinningNumbers, mockMyNumbers)).toEqual([
    17, 48, 83, 86,
  ]);
});

test("parseCard parses a card", () => {
  const mockCard = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
  const mockCard2 =
    "Card   3: 94 35 26 78 66 40 64  7 31 65 | 26 40 65 35 94 36 69 20  7 76 56 27 91 83 66 14 72 31 43 64 34 67 38 78  9";

  expect(parseCard(mockCard)).toEqual({
    cardNumber: 1,
    winningNumbers: [41, 48, 83, 86, 17],
    myNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
  });
  expect(parseCard(mockCard2)).toEqual({
    cardNumber: 3,
    winningNumbers: [94, 35, 26, 78, 66, 40, 64, 7, 31, 65],
    myNumbers: [
      26, 40, 65, 35, 94, 36, 69, 20, 7, 76, 56, 27, 91, 83, 66, 14, 72, 31, 43,
      64, 34, 67, 38, 78, 9,
    ],
  });
});

test("parseInput parses input", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");
  let mockInput2 = `Card   1: 34 55 49 53 46  7 82 22 59 33 | 33 29  7 66 22 51 59 21 55 85 53 26 94 46 24 82  6 47 38  2 34 89 49 41 76
Card   2: 92 73 47  1 91 82 52 98 84 63 | 39 31 73 63 67 91 97 44  8  1 52 20 25 92 43 81 10 36 45 82 47 84  2 98 23
Card   3: 94 35 26 78 66 40 64  7 31 65 | 26 40 65 35 94 36 69 20  7 76 56 27 91 83 66 14 72 31 43 64 34 67 38 78  9`;

  expect(parseInput(mockInput)).toEqual([
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
  ]);
  expect(parseInput(mockInput2)).toEqual([
    "Card   1: 34 55 49 53 46  7 82 22 59 33 | 33 29  7 66 22 51 59 21 55 85 53 26 94 46 24 82  6 47 38  2 34 89 49 41 76",
    "Card   2: 92 73 47  1 91 82 52 98 84 63 | 39 31 73 63 67 91 97 44  8  1 52 20 25 92 43 81 10 36 45 82 47 84  2 98 23",
    "Card   3: 94 35 26 78 66 40 64  7 31 65 | 26 40 65 35 94 36 69 20  7 76 56 27 91 83 66 14 72 31 43 64 34 67 38 78  9",
  ]);
});

test("part1", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");

  expect(part1(mockInput)).toBe(13);
});
