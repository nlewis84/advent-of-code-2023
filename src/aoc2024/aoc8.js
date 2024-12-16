const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper function to parse the input into a 2D grid
function parseGrid(inputLines) {
  return inputLines.map((line) => line.split(""));
}

// Helper function to find all antennas of the same frequency in the grid
function findAntennas(grid) {
  const antennas = {};

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const antenna = grid[y][x];
      if (antenna !== ".") {
        if (!antennas[antenna]) {
          antennas[antenna] = [];
        }
        antennas[antenna].push({ x, y });
      }
    }
  }

  return antennas;
}

// Helper function to check if one antenna is twice as far from a reference point as another antenna
// I think this is a red herring.....I don't even use this, even though it is tested.
function areTwiceAsFar(antenna1, antenna2, referencePoint) {
  const distA =
    Math.abs(antenna1.x - referencePoint.x) +
    Math.abs(antenna1.y - referencePoint.y);
  const distB =
    Math.abs(antenna2.x - referencePoint.x) +
    Math.abs(antenna2.y - referencePoint.y);

  return distA === 2 * distB || distB === 2 * distA;
}

// Helper function to find and mark antinodes
function findAntinodes(grid) {
  const antennas = findAntennas(grid);
  const antinodes = new Set();

  // For each antenna frequency
  for (let freq in antennas) {
    const positions = antennas[freq];

    // For each pair of antennas with the same frequency
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const antenna1 = positions[i];
        const antenna2 = positions[j];

        // Calculate the vector from antenna1 to antenna2
        const deltaX = antenna2.x - antenna1.x;
        const deltaY = antenna2.y - antenna1.y;

        // Find the two antinodes, one in the opposite direction and one in the same direction
        const antinode1 = { x: antenna1.x - deltaX, y: antenna1.y - deltaY }; // opposite direction
        const antinode2 = { x: antenna2.x + deltaX, y: antenna2.y + deltaY }; // same direction

        // Mark the antinodes if they are within grid bounds (i.e., not negative)
        if (
          antinode1.x >= 0 &&
          antinode1.x < grid[0].length &&
          antinode1.y >= 0 &&
          antinode1.y < grid.length
        ) {
          antinodes.add(`${antinode1.x},${antinode1.y}`);
        }

        if (
          antinode2.x >= 0 &&
          antinode2.x < grid[0].length &&
          antinode2.y >= 0 &&
          antinode2.y < grid.length
        ) {
          antinodes.add(`${antinode2.x},${antinode2.y}`);
        }
      }
    }
  }

  return antinodes;
}

// Part 2 Antinodes everywhere!
// Helper function to find and mark antinodes for Part 2
function findPart2Antinodes(grid) {
  const antennas = findAntennas(grid);
  const antinodes = new Set();

  // For each antenna frequency
  for (let freq in antennas) {
    const positions = antennas[freq];

    // For each antenna, add it to the antinode set (since it is in line with at least one other antenna)
    for (let i = 0; i < positions.length; i++) {
      const antenna1 = positions[i];
      antinodes.add(`${antenna1.x},${antenna1.y}`); // Mark the antenna itself as an antinode
    }

    // For each pair of antennas with the same frequency, check for positions in line
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const antenna1 = positions[i];
        const antenna2 = positions[j];

        // Calculate the vector from antenna1 to antenna2
        const deltaX = antenna2.x - antenna1.x;
        const deltaY = antenna2.y - antenna1.y;

        // Find positions along the line between the two antennas in both directions
        markLine(antenna1, deltaX, deltaY, grid, antinodes);
        markLine(antenna2, -deltaX, -deltaY, grid, antinodes); // Going in the opposite direction
      }
    }
  }

  return antinodes;
}

// Helper function to mark positions along a line in both directions
function markLine(start, deltaX, deltaY, grid, antinodes) {
  let x = start.x;
  let y = start.y;

  // Continue marking in the direction of the vector until we go off the grid
  while (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
    // Mark the current position as an antinode
    antinodes.add(`${x},${y}`);

    // Move to the next point along the line in the vector direction
    x += deltaX;
    y += deltaY;
  }
}

// Main function to count unique antinodes
function part1(lines) {
  const grid = parseGrid(lines);
  const antinodes = findAntinodes(grid);
  return antinodes.size;
}

function part2(lines) {
  const grid = parseGrid(lines);
  const antinodes = findPart2Antinodes(grid);
  return antinodes.size;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  parseGrid,
  findAntennas,
  findAntinodes,
  areTwiceAsFar,
  findPart2Antinodes,
  markLine,
};
