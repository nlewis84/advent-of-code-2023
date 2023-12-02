const { aoc_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseGameData(data) {
  // Input: a string - Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  // Output: ex: [ { "blue": 3, "red": 4 }, { "red": 1, "green": 2, "blue": 6 }, { "green": 2 } ]
  if (typeof data !== "string") {
    return [];
  }

  const gameStrings = data.split(/Game \d+: /).filter((s) => s);

  const games = gameStrings.map((gameString) => {
    // Split by semicolon to get individual sets
    const sets = gameString
      .split(";")
      .map((set) => set.trim())
      .filter((set) => set);

    return sets.map((set) => {
      const setObj = {};
      const colorCounts = set.split(", ");

      for (const colorCount of colorCounts) {
        const [count, colorName] = colorCount.split(" ");
        setObj[colorName] = parseInt(count, 10);
      }

      return setObj;
    });
  });

  // Flatten the array of games as each game's sets should be separate entries
  return games.flat();
}

function calculateMaxCubesPerColor(gameData) {
  // Input: output from parseGameData
  // Output: { "blue": 6, "red": 4, "green": 2 }
  const maxCubesPerColor = {};

  for (const game of gameData) {
    for (const [color, count] of Object.entries(game)) {
      if (!maxCubesPerColor[color] || count > maxCubesPerColor[color]) {
        maxCubesPerColor[color] = count;
      }
    }
  }

  return maxCubesPerColor;
}

function isGamePossible(game, maxCubesPerColor) {
  // Input: output calculateMaxCubesPerColor and { "red": 12, "green": 13, "blue": 14 }
  // Output: Boolean
  for (const [color, count] of Object.entries(game)) {
    if (count > maxCubesPerColor[color]) {
      return false;
    }

    return true;
  }
}

// Part 1
function part1(lines) {
  return 0;
}

// Part 2
function part2(lines) {
  return 0;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");

module.exports = {
  part1,
  part2,
  // other functions
  parseGameData,
  calculateMaxCubesPerColor,
  isGamePossible,
};
