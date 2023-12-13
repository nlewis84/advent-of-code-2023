const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input, copies = 1) {
  // Input: string of lines and number of copies; ex: "???.### 1,1,3\n.??..??...?##. 1,1,3" and 1
  // Output: array of objects; ex: [ { springPattern: "???.###", groupSizes: [1, 1, 3] }, { springPattern: ".??..??...?##.", groupSizes: [1, 1, 3] } ]

  return input.split("\n").map((line) => {
    let [springPattern, groupSizesStr] = line.split(" ");
    // Replicate the spring pattern 'copies' times
    springPattern = Array(copies).fill(springPattern).join("?");

    // Correctly replicate the entire sequence of group sizes 'copies' times in order
    let groupSizes = groupSizesStr.split(",").map(Number);
    groupSizes = Array(copies).fill(groupSizes).flat();

    return { springPattern, groupSizes };
  });
}

function initializeArrangementCounts(patternLength, groupCount) {
  // Input: pattern length, group count; ex: 8, 3
  // Output: 3D array; ex: [ [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ... ], ... ]

  // Needed a way to track three things: current position in the pattern, current testing group, and size of previous group
  return Array.from({ length: patternLength + 1 }, () =>
    Array.from({ length: groupCount + 2 }, () =>
      new Array(patternLength + 2).fill(0)
    )
  );
}

function calculateArrangements(springPattern, groupSizes) {
  // Input: spring pattern, group sizes; ex: "???.###", [1, 1, 3]
  // Output: number; ex: 4
  springPattern += ".";
  let patternLength = springPattern.length;
  let groupCount = groupSizes.length;
  groupSizes.push(patternLength + 1);

  let arrangementCounts = initializeArrangementCounts(
    patternLength,
    groupCount
  );
  arrangementCounts[0][0][0] = 1;

  for (let patternIndex = 0; patternIndex < patternLength; patternIndex++) {
    for (
      let currentGroupIndex = 0;
      currentGroupIndex < groupCount + 1;
      currentGroupIndex++
    ) {
      for (
        let sizeOfPreviousGroup = 0;
        sizeOfPreviousGroup < patternLength + 1;
        sizeOfPreviousGroup++
      ) {
        let countAtCurrentState =
          arrangementCounts[patternIndex][currentGroupIndex][
            sizeOfPreviousGroup
          ];
        if (!countAtCurrentState) continue;

        updateArrangementCounts(
          arrangementCounts,
          springPattern,
          groupSizes,
          patternIndex,
          currentGroupIndex,
          sizeOfPreviousGroup,
          countAtCurrentState
        );
      }
    }
  }

  return arrangementCounts[patternLength][groupCount][0];
}

function updateArrangementCounts(
  arrangementCounts,
  springPattern,
  groupSizes,
  patternIndex,
  currentGroupIndex,
  sizeOfPreviousGroup,
  countAtCurrentState
) {
  // Input: arrangement counts, spring pattern, group sizes, pattern index, current group index, size of previous group, count at current state; ex: [ [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ... ], ... ], "???.###", [1, 1, 3], 0, 0, 0, 1
  // Output: updated 3d array - not returned
  if (
    springPattern[patternIndex] === "." ||
    springPattern[patternIndex] === "?"
  ) {
    if (
      sizeOfPreviousGroup === 0 ||
      sizeOfPreviousGroup === groupSizes[currentGroupIndex - 1]
    ) {
      arrangementCounts[patternIndex + 1][currentGroupIndex][0] +=
        countAtCurrentState;
    }
  }
  if (
    springPattern[patternIndex] === "#" ||
    springPattern[patternIndex] === "?"
  ) {
    arrangementCounts[patternIndex + 1][
      currentGroupIndex + (sizeOfPreviousGroup === 0 ? 1 : 0)
    ][sizeOfPreviousGroup + 1] += countAtCurrentState;
  }
}

function countArrangements(input, copies = 1) {
  // Input: string of lines and number of copies; ex: "???.### 1,1,3\n.??..??...?##. 1,1,3" and 1
  // Output: number; ex: 8
  let totalArrangements = 0;
  const parsedData = parseInput(input, copies);
  console.log(parsedData);
  parsedData.forEach(({ springPattern, groupSizes }) => {
    totalArrangements += calculateArrangements(springPattern, groupSizes);
  });

  return totalArrangements;
}

// Part 1
function part1(lines) {
  const solution = countArrangements(lines);
  return solution;
}

// Part 2
function part2(lines, copies) {
  const solution = countArrangements(lines, copies);
  return solution;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
// console.log("test", countArrangements("???.### 1,1,3"));
// console.log("Part 2:", part2(lines, 5));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  initializeArrangementCounts,
  calculateArrangements,
  updateArrangementCounts,
  countArrangements,
};
