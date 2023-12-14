const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  // Input: string; ex: "O....#....\nO.OO#....#\n.....##..."
  // Output: Array<Array<string>>; ex: [["O",".",".",".","#",".",".",".","."],["O",".","O","O","#",".",".",".","."],[".",".",".",".",".","#","#",".","."]]

  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
}

function calculateLoad(platform) {
  let rows = platform.length;
  let cols = platform[0].length;
  let moved;
  do {
    moved = false;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        if (platform[row][col] === "." && platform[row + 1][col] === "O") {
          // Swap '.' and 'O'
          platform[row][col] = "O";
          platform[row + 1][col] = ".";
          moved = true;
        }
      }
    }
  } while (moved);

  // Calculate load
  let totalLoad = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (platform[row][col] === "O") {
        totalLoad += rows - row;
      }
    }
  }
  return totalLoad;
}

function tiltPlatform(platform, direction) {
  let rows = platform.length;
  let cols = platform[0].length;
  let moved;

  switch (direction) {
    case "north":
      do {
        moved = false;
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows - 1; row++) {
            if (platform[row][col] === "." && platform[row + 1][col] === "O") {
              platform[row][col] = "O";
              platform[row + 1][col] = ".";
              moved = true;
            }
          }
        }
      } while (moved);
      break;

    case "west":
      do {
        moved = false;
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols - 1; col++) {
            if (platform[row][col] === "." && platform[row][col + 1] === "O") {
              platform[row][col] = "O";
              platform[row][col + 1] = ".";
              moved = true;
            }
          }
        }
      } while (moved);
      break;

    case "south":
      do {
        moved = false;
        for (let col = 0; col < cols; col++) {
          for (let row = rows - 1; row > 0; row--) {
            if (platform[row][col] === "." && platform[row - 1][col] === "O") {
              platform[row][col] = "O";
              platform[row - 1][col] = ".";
              moved = true;
            }
          }
        }
      } while (moved);
      break;

    case "east":
      do {
        moved = false;
        for (let row = 0; row < rows; row++) {
          for (let col = cols - 1; col > 0; col--) {
            if (platform[row][col] === "." && platform[row][col - 1] === "O") {
              platform[row][col] = "O";
              platform[row][col - 1] = ".";
              moved = true;
            }
          }
        }
      } while (moved);
      break;
  }
}

function performSpinCycle(platform) {
  const directions = ["north", "west", "south", "east"];
  for (let direction of directions) {
    tiltPlatform(platform, direction);
  }
}

function serializePlatform(platform) {
  return platform.map((row) => row.join("")).join("\n");
}

// Part 1
function part1(lines) {
  let mirror = parseInput(lines);
  let answer = calculateLoad(mirror);
  return answer;
}

// Part 2
function part2(lines) {
  let platform = parseInput(lines);
  const totalCycles = 1000000000;
  const seenStates = new Map();
  let cycleCount = 0;
  let periodStart = -1;
  let potentialPeriod = 0;

  while (cycleCount < totalCycles) {
    performSpinCycle(platform);
    const serialized = serializePlatform(platform);

    if (seenStates.has(serialized)) {
      if (periodStart === -1) {
        // First time seeing a repeat; set up for confirmation
        periodStart = seenStates.get(serialized);
        potentialPeriod = cycleCount - periodStart;
        seenStates.clear(); // Clear to re-record states for confirmation
      } else if (cycleCount - periodStart === potentialPeriod) {
        // Repeat confirmed
        break;
      }
    }

    if (periodStart === -1 || cycleCount < periodStart + potentialPeriod) {
      seenStates.set(serialized, cycleCount);
    }

    cycleCount++;
  }

  // Calculate the remaining cycles after skipping
  const cyclesToSkip =
    Math.floor((totalCycles - cycleCount) / potentialPeriod) * potentialPeriod;
  cycleCount += cyclesToSkip;

  // Perform the remaining cycles
  const remainingCycles = totalCycles - cycleCount;
  for (let i = 0; i < remainingCycles; i++) {
    performSpinCycle(platform);
  }

  return calculateLoad(platform);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  calculateLoad,
};
