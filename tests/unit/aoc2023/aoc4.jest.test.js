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
  const mockArray2 = [512, 512, 128, 1, 2, 8, 0, 0, 0, 64, 64, 32, 16, 2, 0, 1];
  const mockArray3 = [
    512, 512, 512, 32, 32, 512, 512, 512, 2, 128, 1, 2, 512, 16, 128, 64, 16, 8,
    8, 1, 4, 1, 0, 0, 512, 32, 64, 8, 128, 512, 4, 16, 32, 2, 128, 32, 32, 2, 4,
    1, 0, 1, 0, 512, 8, 512, 64, 8, 4, 8, 16, 512, 16, 0, 16, 0, 4, 2, 4, 0, 2,
    1, 0, 512, 64, 256, 512, 2, 128, 512, 1, 512, 512, 2, 64, 0, 0, 0, 8, 4, 1,
    1, 0, 512, 512, 512, 512, 0, 2, 2, 4, 128, 2, 16, 0, 32, 1, 1, 0, 2, 0, 0,
    512, 1, 16, 64, 0, 128, 0, 1, 1, 1, 4, 0, 0, 1, 0, 64, 64, 64, 1, 256, 64,
    64, 2, 0, 32, 8, 8, 0, 0, 1, 0, 512, 256, 512, 512, 512, 2, 2, 512, 16, 64,
    16, 64, 2, 8, 4, 4, 0, 2, 1, 0, 32, 512, 256, 0, 1, 2, 2, 512, 8, 0, 16, 1,
    32, 2, 16, 8, 2, 2, 1, 0, 512, 512, 128, 512, 2, 512, 512, 4, 1, 512, 16,
    128, 16, 256, 0, 2, 8, 0, 1, 4, 2, 2, 0, 0,
  ];

  expect(sumScratchcards(mockArray)).toBe(15);
  expect(sumScratchcards(mockArray2)).toBe(1342);
  // expect(sumScratchcards(mockArray3)).toBe(15205);
});

test("calculatePointsForWinningNumbers calculates the points for winning numbers", () => {
  const mockArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const mockArray2 = [26, 31, 35, 40, 64, 65, 66, 7, 78, 94];
  const mockArray3 = [1, 47, 52, 63, 73, 82, 84, 91, 92, 98];

  expect(calculatePointsForWinningNumbers(mockArray)).toBe(128);
  expect(calculatePointsForWinningNumbers(mockArray2)).toBe(512);
  expect(calculatePointsForWinningNumbers(mockArray3)).toBe(512);
});

test("checkForWinningNumbers returns an array of winning numbers", () => {
  const mockWinningNumbers = [41, 48, 83, 86, 17];
  const mockMyNumbers = [83, 86, 6, 31, 17, 9, 48, 53];
  const mockWinningNumbers2 = [94, 35, 26, 78, 66, 40, 64, 7, 31, 65];
  const mockMyNumbers2 = [
    26, 40, 65, 35, 94, 36, 69, 20, 7, 76, 56, 27, 91, 83, 66, 14, 72, 31, 43,
    64, 34, 67, 38, 78, 9,
  ];
  const mockWinningNumber3 = [92, 73, 47, 1, 91, 82, 52, 98, 84, 63];
  const mockMyNumbers3 = [
    39, 31, 73, 63, 67, 91, 97, 44, 8, 1, 52, 20, 25, 92, 43, 81, 10, 36, 45,
    82, 47, 84, 2, 98, 23,
  ];

  expect(checkForWinningNumbers(mockWinningNumbers, mockMyNumbers)).toEqual([
    17, 48, 83, 86,
  ]);
  expect(checkForWinningNumbers(mockWinningNumbers2, mockMyNumbers2)).toEqual([
    26, 31, 35, 40, 64, 65, 66, 7, 78, 94,
  ]);
  expect(checkForWinningNumbers(mockWinningNumber3, mockMyNumbers3)).toEqual([
    1, 47, 52, 63, 73, 82, 84, 91, 92, 98,
  ]);
});

test("parseCard parses a card", () => {
  const mockCard = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
  const mockCard2 =
    "Card   3: 94 35 26 78 66 40 64  7 31 65 | 26 40 65 35 94 36 69 20  7 76 56 27 91 83 66 14 72 31 43 64 34 67 38 78  9";
  const mockCard3 =
    "Card   2: 92 73 47  1 91 82 52 98 84 63 | 39 31 73 63 67 91 97 44  8  1 52 20 25 92 43 81 10 36 45 82 47 84  2 98 23";
  const mockCard4 =
    "Card 195: 23 33 19 46 92 64 32 54 71 25 | 18 75 29 42 39 26 59 12 53 78 85 28 48 32 96 23 44 10 58 37  7 66  2  1 93";
  const mockCard5 =
    "Card 165:  2 54  7 72  8 85 60 24 90 45 |  6 94 44 38 96 50 84 92 56 26 21 68 18 70 33 88 91 29 63 81 47 71 12 22 80";

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
  expect(parseCard(mockCard3)).toEqual({
    cardNumber: 2,
    winningNumbers: [92, 73, 47, 1, 91, 82, 52, 98, 84, 63],
    myNumbers: [
      39, 31, 73, 63, 67, 91, 97, 44, 8, 1, 52, 20, 25, 92, 43, 81, 10, 36, 45,
      82, 47, 84, 2, 98, 23,
    ],
  });
  expect(parseCard(mockCard4)).toEqual({
    cardNumber: 195,
    winningNumbers: [23, 33, 19, 46, 92, 64, 32, 54, 71, 25],
    myNumbers: [
      18, 75, 29, 42, 39, 26, 59, 12, 53, 78, 85, 28, 48, 32, 96, 23, 44, 10,
      58, 37, 7, 66, 2, 1, 93,
    ],
  });
  expect(parseCard(mockCard5)).toEqual({
    cardNumber: 165,
    winningNumbers: [2, 54, 7, 72, 8, 85, 60, 24, 90, 45],
    myNumbers: [
      6, 94, 44, 38, 96, 50, 84, 92, 56, 26, 21, 68, 18, 70, 33, 88, 91, 29, 63,
      81, 47, 71, 12, 22, 80,
    ],
  });
});

test("parseInput parses input", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");
  const mockInput2 = `Card   1: 34 55 49 53 46  7 82 22 59 33 | 33 29  7 66 22 51 59 21 55 85 53 26 94 46 24 82  6 47 38  2 34 89 49 41 76
Card   2: 92 73 47  1 91 82 52 98 84 63 | 39 31 73 63 67 91 97 44  8  1 52 20 25 92 43 81 10 36 45 82 47 84  2 98 23
Card   3: 94 35 26 78 66 40 64  7 31 65 | 26 40 65 35 94 36 69 20  7 76 56 27 91 83 66 14 72 31 43 64 34 67 38 78  9`;
  const mockInput3 = `Card 195: 23 33 19 46 92 64 32 54 71 25 | 18 75 29 42 39 26 59 12 53 78 85 28 48 32 96 23 44 10 58 37  7 66  2  1 93
Card 196: 96 32 55 61 82  9 77 18 99 28 | 64  5 26 97 54 62 69 19  7 29 27 47 56 33 44 50 83 43 88 72 91 10 12 51 35
Card 197: 43 22 47 86 64 70  3 59 87 13 | 56 24 57 38 36 76 85 96 63 62 18 44  8 25 69 54 75 39  2 81  6 77 58 33 83`;

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
  expect(parseInput(mockInput3)).toEqual([
    "Card 195: 23 33 19 46 92 64 32 54 71 25 | 18 75 29 42 39 26 59 12 53 78 85 28 48 32 96 23 44 10 58 37  7 66  2  1 93",
    "Card 196: 96 32 55 61 82  9 77 18 99 28 | 64  5 26 97 54 62 69 19  7 29 27 47 56 33 44 50 83 43 88 72 91 10 12 51 35",
    "Card 197: 43 22 47 86 64 70  3 59 87 13 | 56 24 57 38 36 76 85 96 63 62 18 44  8 25 69 54 75 39  2 81  6 77 58 33 83",
  ]);
});

test("part1", () => {
  const mockInput = fs.readFileSync(aoc_test_input, "utf-8");

  expect(part1(mockInput)).toBe(13);
});
