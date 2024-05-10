const fs = require("fs");

// Constants for Greed Scoring
const DICE = 5;
// A single one (100 points)
// A single five (50 points)
// Triple ones [1,1,1] (1000 points)
// Triple twos [2,2,2] (200 points)
// Triple threes [3,3,3] (300 points)
// Triple fours [4,4,4] (400 points)
// Triple fives [5,5,5] (500 points)
// Triple sixes [6,6,6] (600 points)
// We should structure this data in a way that we check for the highest scoring first, then the next highest, and so on.
// We will be popping the dice out of the array as we score them, so we will need to check for the highest scoring first.
const SCORING = [
  { dice: [1, 1, 1], score: 1000 },
  { dice: [6, 6, 6], score: 600 },
  { dice: [5, 5, 5], score: 500 },
  { dice: [4, 4, 4], score: 400 },
  { dice: [3, 3, 3], score: 300 },
  { dice: [2, 2, 2], score: 200 },
  { dice: [1], score: 100 },
  { dice: [5], score: 50 },
];

// Rolling the Dice
// Return an array of DICE random numbers between 1 and 6
const roll = () => {
  // console.log("Rolling the Dice");
  return Array.from({ length: DICE }, () => Math.floor(Math.random() * 6) + 1);
};

// Scoring the Dice
// First roll the die, then score the die, going through SCORING array in order of index (most points to least)
const score = (dice) => {
  // console.log("Dice: ", dice);
  // console.log("Scoring the Dice");

  let score = 0;
  let counts = {};

  // Count occurrences of each dice face
  for (let val of dice) {
    if (counts[val]) {
      counts[val] += 1;
    } else {
      counts[val] = 1;
    }
  }

  // Scoring for triples
  for (let num in counts) {
    if (counts[num] >= 3) {
      score += num === "1" ? 1000 : parseInt(num) * 100;
      counts[num] -= 3;
    }
  }

  // Scoring for singles (ones and fives only, after triples are scored)
  score += (counts["1"] || 0) * 100;
  score += (counts["5"] || 0) * 50;

  return score;
};

module.exports = {
  roll,
  score,
};
