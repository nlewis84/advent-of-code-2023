const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function calculateNextValueWithBacktracking(sequence) {
  let sequences = [sequence];

  // Calculate sequences of differences until all differences are zero
  while (
    sequences[sequences.length - 1].some(
      (val, idx, arr) => idx < arr.length - 1 && val !== arr[idx + 1]
    )
  ) {
    let newSequence = [];
    for (let i = 0; i < sequences[sequences.length - 1].length - 1; i++) {
      newSequence.push(
        sequences[sequences.length - 1][i + 1] -
          sequences[sequences.length - 1][i]
      );
    }
    sequences.push(newSequence);
  }

  // Backtrack to find the next value in the original sequence
  for (let i = sequences.length - 2; i >= 0; i--) {
    sequences[i].push(
      sequences[i][sequences[i].length - 1] +
        sequences[i + 1][sequences[i + 1].length - 1]
    );
  }

  // Return the next value in the original sequence
  return sequences[0][sequences[0].length - 1];
}

function processInputAndCalculateSum(input) {
  // Split the input into lines (each line representing a sequence)
  let lines = input.split("\n");

  // Map each line to an array of numbers (sequence)
  let sequences = lines.map((line) => line.split(" ").map(Number));

  // Calculate the next value for each sequence and sum them up
  return sequences.reduce(
    (sum, sequence) => sum + calculateNextValueWithBacktracking(sequence),
    0
  );
}

// Part 2 functions
function backtrackToFindPreviousValue(sequences) {
  let diffSequences = sequences.map((seq) => {
    // console.log("Original sequence:", seq);

    let differences = [];
    let currentSeq = [...seq];

    // Calculate the sequences of differences
    while (currentSeq.length > 1) {
      let newSeq = [];
      for (let i = 0; i < currentSeq.length - 1; i++) {
        newSeq.push(currentSeq[i + 1] - currentSeq[i]);
      }
      differences.push(newSeq);
      currentSeq = newSeq;

      // console.log("Current differences:", newSeq);
    }

    // Add a sequence of all zeros at the end
    let zeros = new Array(differences[differences.length - 1].length).fill(0);
    differences.push(zeros);
    // console.log("Added zeros:", zeros);

    // Push the original sequence to the beginning
    differences.unshift(seq);

    return differences;
  });

  // console.log("All difference sequences:", diffSequences);

  // Backtrack to find the previous value in the original sequence
  return diffSequences.map((differences) => {
    for (let i = differences.length - 1; i >= 1; i--) {
      let newFirstValue = differences[i - 1][0] - differences[i][0];
      differences[i - 1].unshift(newFirstValue);
      // console.log(`Backtracking step ${i}, new first value:`, newFirstValue);
    }
    // console.log("Final backtracked sequence:", differences[0], diffSequences);
    return differences[0][0];
  });
}

function processInputAndCalculateFirstValueSum(input) {
  // Split the input into lines (each line representing a sequence)
  let lines = input.split("\n");

  // Map each line to an array of numbers (sequence)
  let sequences = lines.map((line) => line.split(" ").map(Number));

  const arrayOfFirstValues = backtrackToFindPreviousValue(sequences);
  // Sum the array of values
  return arrayOfFirstValues.reduce((sum, val) => sum + val, 0);
}

// Part 1
function part1(lines) {
  const sumOfNextValues = processInputAndCalculateSum(lines);
  return sumOfNextValues;
}

// Part 2
function part2(lines) {
  return processInputAndCalculateFirstValueSum(lines);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  processInputAndCalculateSum,
  backtrackToFindPreviousValue,
};
