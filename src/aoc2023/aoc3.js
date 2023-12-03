const { aoc_input } = require("../../config");
const fs = require("fs");

// Helper functions
function schematicToArray(schematic) {
  // Input: a string - ex: "123\n..*\n..."
  // Output: an array - ex: [ [ "1", "2", "3" ], [ ".", ".", "*" ], [ ".", ".", "." ] ]

  return schematic.split("\n").map((row) => row.split(""));
}

function isSymbol(cell) {
  // Input: a string - ex: "1"
  // Output: a boolean

  // is not a . or a number or a letter
  return !/\.|\d|[a-zA-Z]/.test(cell);
}

function findNumberGroups(schematic) {
  // Input: 2D array - ex: [ [ "1", "2", "3" ], [ ".", ".", "*" ], [ ".", ".", "." ] ]
  // Output: an array of objects - ex: [ { number: '123', positions: [[0, 0], [0, 1], [0, 2]] } ]

  const numberGroups = [];
  const visited = new Set();

  // Number groups only go left to right
  for (let row = 0; row < schematic.length; row++) {
    for (let col = 0; col < schematic[row].length; col++) {
      const cell = schematic[row][col];

      if (isSymbol(cell) || visited.has(`${row},${col}`)) {
        continue;
      }

      const numberGroup = {
        number: "",
        positions: [],
      };

      // Traverse the number group
      let currentRow = row;
      let currentCol = col;
      while (currentCol < schematic[row].length) {
        const currentCell = schematic[currentRow][currentCol];

        if (isSymbol(currentCell)) {
          break;
        }

        numberGroup.number += currentCell;
        numberGroup.positions.push([currentRow, currentCol]);

        visited.add(`${currentRow},${currentCol}`);

        currentCol++;
      }

      numberGroups.push(numberGroup);
    }
  }

  return numberGroups;
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
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  schematicToArray,
  isSymbol,
  findNumberGroups,
};
