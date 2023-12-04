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
  const numberGroups = [];

  for (let row = 0; row < schematic.length; row++) {
    let col = 0;
    while (col < schematic[row].length) {
      const cell = schematic[row][col];

      if (/\d/.test(cell)) {
        let number = "";
        let currentCol = col;
        let positions = [];
        let adjacentToSymbol = false;

        // Collect the complete number
        while (
          currentCol < schematic[row].length &&
          /\d/.test(schematic[row][currentCol])
        ) {
          number += schematic[row][currentCol];
          positions.push([row, currentCol]);
          if (isAdjacentToSymbol(schematic, row, currentCol)) {
            adjacentToSymbol = true;
          }
          currentCol++;
        }

        // Add number group if it's not empty and adjacent to a symbol
        if (number && adjacentToSymbol) {
          numberGroups.push({ number, positions, adjacentToSymbol });
        }

        // Update col to the end of the current number group
        col = currentCol;
      } else {
        col++;
      }
    }
  }

  return numberGroups;
}

function isAdjacentToSymbol(schematic, row, col) {
  // Output - a boolean
  // Check all 8 directions around the cell and return true if any adjacent cell contains a symbol

  const directions = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  for (const [row, col] of directions) {
    if (isSymbol(schematic[row]?.[col])) {
      return true;
    }
  }

  return false;
}

function isGear(schematic, numberGroups, row, col) {
  if (!isSymbol(schematic[row][col])) {
    return false;
  }

  let adjacentGroupIds = new Set();
  const directions = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  directions.forEach(([adjRow, adjCol]) => {
    if (
      adjRow >= 0 &&
      adjRow < schematic.length &&
      adjCol >= 0 &&
      adjCol < schematic[adjRow].length
    ) {
      numberGroups.forEach((group, groupId) => {
        group.positions.forEach(([groupRow, groupCol]) => {
          if (groupRow === adjRow && groupCol === adjCol) {
            adjacentGroupIds.add(groupId);
          }
        });
      });
    }
  });

  return adjacentGroupIds.size === 2;
}

function calculateGearRatio(ratios) {
  // Input: an array of two numbers
  // Output: a number

  return ratios[0] * ratios[1];
}

function getAdjacentRatios(numberGroups, gearRow, gearCol) {
  let ratios = [];

  numberGroups.forEach((group) => {
    if (
      group.positions.some(
        ([row, col]) =>
          Math.abs(row - gearRow) <= 1 && Math.abs(col - gearCol) <= 1
      )
    ) {
      ratios.push(parseInt(group.number, 10));
    }
  });

  return ratios.filter((value, index, self) => self.indexOf(value) === index); // Remove duplicate values
}

// Part 1
function part1(lines) {
  const schematic = schematicToArray(lines.join("\n"));
  const numberGroups = findNumberGroups(schematic);

  // Debugging: Log each number group found
  console.log("Number groups:", numberGroups);

  let sum = 0;
  for (const group of numberGroups) {
    sum += parseInt(group.number);
  }

  // Debugging: Log the calculated sum
  console.log("Calculated sum:", sum);

  return sum;
}

// Part 2
function part2(lines) {
  const schematic = schematicToArray(lines.join("\n"));
  const numberGroups = findNumberGroups(schematic);

  let totalGearRatio = 0;

  for (let row = 0; row < schematic.length; row++) {
    for (let col = 0; col < schematic[row].length; col++) {
      console.log(isGear(schematic, numberGroups, row, col));
      if (isGear(schematic, numberGroups, row, col)) {
        const adjacentRatios = getAdjacentRatios(numberGroups, row, col);
        if (adjacentRatios.length === 2) {
          const gearRatio = calculateGearRatio(adjacentRatios);
          totalGearRatio += gearRatio;
          console.log(`Gear at [${row}, ${col}] has ratio: ${gearRatio}`);
        }
      }
    }
  }

  console.log(`Total gear ratio: ${totalGearRatio}`);
  return totalGearRatio;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  schematicToArray,
  calculateGearRatio,
  isSymbol,
  isGear,
  findNumberGroups,
  isAdjacentToSymbol,
  getAdjacentRatios,
};
