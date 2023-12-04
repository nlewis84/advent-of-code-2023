const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
// Function to parse an input
function parseInput(input) {
  // Input: a string - ex:
  // "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  // "
  // Output: an array of strings - ex:
  // [
  //   "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  //   "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  //   "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1"
  // ]

  return input.split("\n").filter((line) => line);
}

// Function to parse input
function parseCard(input) {
  // Input: a string - ex: "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
  // Output: an object - ex: { cardNumber: 1, winningNumbers: [ 41, 48, 83, 86, 17 ], myNumbers: [ 83, 86, 6, 31, 17, 9, 48, 53 ] }

  // Sometimes there are extra spaces in the input
  // Replace multiple spaces with a single space
  const cleanedInput = input.replace(/\s+/g, " ");

  const [cardNumber, numbers] = input.split(": ");
  const [winningNumbers, myNumbers] = numbers.split(" | ");

  // Sometimes there are extra spaces in the input
  // Replace multiple spaces with a single space
  const winningNumbersArray = winningNumbers
    .replace(/\s+/g, " ")
    .split(" ")
    .map((num) => parseInt(num, 10));

  const myNumbersArray = myNumbers
    .replace(/\s+/g, " ")
    .split(" ")
    .map((num) => parseInt(num, 10));

  return {
    cardNumber: parseInt(cardNumber.replace("Card ", ""), 10),
    winningNumbers: winningNumbersArray,
    myNumbers: myNumbersArray,
  };
}

// Function to check for winning numbers
function checkForWinningNumbers(winningNumbers, myNumbers) {
  // Input: two arrays of numbers - ex: [ 1, 2, 3, 4, 5, 6 ] and [ 2, 4, 6, 14, 298, 12 ]
  // Output: an array of numbers - ex: [ 2, 4, 6 ]

  return winningNumbers.filter((num) => myNumbers.includes(num)).sort();
}

// Function to calculate points for winning numbers
function calculatePointsForWinningNumbers(winningNumbers) {
  // Input: an array of numbers - ex: [ 1, 2, 3, 4, 5, 6 ]
  // Output: a number - ex: 32

  // The first index is worth 1 point, and each following index doubles the existing points
  // 1, 2, 4, 8, 16, 32
  let points = 0;

  if (!winningNumbers.length) return points;

  if (winningNumbers.length >= 1) {
    points = 1;
  }

  if (winningNumbers.length >= 2) {
    for (let i = 1; i < winningNumbers.length; i++) {
      points *= 2;
    }
  }

  return points;
}

// Function to sum scratchcards
function sumScratchcards(pointsArray) {
  // Input: an array of numbers - ex: [ 1, 2, 3 ]
  // Output: a number - ex: 6

  return pointsArray.reduce((acc, curr) => acc + curr, 0);
}

// Part 1
function part1(lines) {
  // Step 1: Parse the input lines into cards
  const cards = parseInput(lines);

  // Step 2 and 3: Parse each card and check for winning numbers
  const pointsArray = cards.map((card) => {
    const parsedCard = parseCard(card);
    const winningNumbers = checkForWinningNumbers(
      parsedCard.winningNumbers,
      parsedCard.myNumbers
    );

    // Step 4: Calculate points for the winning numbers
    return calculatePointsForWinningNumbers(winningNumbers);
  });

  // Step 5: Sum up all the points from all cards
  const totalPoints = sumScratchcards(pointsArray);

  // Step 6: Return the total sum
  return totalPoints;
}

// Part 2
function part2(lines) {
  return 0;
}

// Reading from file and running both parts
// const lines = fs.readFileSync(aoc_test_input, "utf-8");
const lines = fs.readFileSync(aoc_input, "utf-8");
console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  sumScratchcards,
  calculatePointsForWinningNumbers,
  checkForWinningNumbers,
  parseCard,
  parseInput,
};
