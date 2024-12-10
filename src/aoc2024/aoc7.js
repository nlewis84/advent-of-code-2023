const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(lines) {
  return lines.map((line) => {
    const [testValue, numbers] = line.split(":");
    return {
      testValue: parseInt(testValue.trim(), 10),
      numbers: numbers.trim().split(" ").map(Number),
    };
  });
}

function generateOperatorCombinations(numCount) {
  const operators = ["+", "*"];
  const combinations = [];

  function generate(currentCombination, depth) {
    if (depth === numCount - 1) {
      combinations.push(currentCombination);
      return;
    }

    generate([...currentCombination, operators[0]], depth + 1);
    generate([...currentCombination, operators[1]], depth + 1);
  }

  generate([], 0);
  return combinations;
}

function evaluateEquation(numbers, operators) {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else if (operators[i] === "*") {
      result *= numbers[i + 1];
    }
  }
  return result;
}

function isValidEquation(testValue, numbers, operatorCombination) {
  const result = evaluateEquation(numbers, operatorCombination);
  return result === testValue;
}

function processEquation(equation) {
  const { testValue, numbers } = equation;
  const operatorCombinations = generateOperatorCombinations(numbers.length);

  for (const operators of operatorCombinations) {
    if (isValidEquation(testValue, numbers, operators)) {
      return testValue;
    }
  }

  return 0;
}

function calculateCalibrationResult(parsedInput) {
  let totalResult = 0;

  parsedInput.forEach((equation) => {
    const result = processEquation(equation);
    totalResult += result;
  });

  return totalResult;
}

// Part 1
function part1(lines) {
  const parsedInput = parseInput(lines);
  return calculateCalibrationResult(parsedInput);
}

// New helper function: Generates combinations of +, *, and ||
function generateAllOperatorCombinations(numCount) {
  const operators = ["+", "*", "||"];
  const combinations = [];

  function generate(currentCombination, depth) {
    if (depth === numCount - 1) {
      combinations.push(currentCombination);
      return;
    }

    for (const operator of operators) {
      generate([...currentCombination, operator], depth + 1);
    }
  }

  generate([], 0);
  return combinations;
}

// Updated evaluateEquation to support concatenation (||)
function evaluateConcatenationEquation(numbers, operators) {
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else if (operators[i] === "*") {
      result *= numbers[i + 1];
    } else if (operators[i] === "||") {
      result = parseInt(result.toString() + numbers[i + 1].toString(), 10);
    }
  }

  return result;
}

// Updated isValidEquation to use the new evaluation function
function isValidConcatenationEquation(testValue, numbers, operatorCombination) {
  const result = evaluateConcatenationEquation(numbers, operatorCombination);
  return result === testValue;
}

// New function to process equations with all three operators
function processConcatenationEquation(equation) {
  const { testValue, numbers } = equation;
  const operatorCombinations = generateAllOperatorCombinations(numbers.length);

  for (const operators of operatorCombinations) {
    if (isValidConcatenationEquation(testValue, numbers, operators)) {
      return testValue;
    }
  }

  return 0;
}

// Updated calibration calculation to use the new processing function
function calculateFullCalibrationResult(parsedInput) {
  let totalResult = 0;

  parsedInput.forEach((equation) => {
    const result = processConcatenationEquation(equation);
    totalResult += result;
  });

  return totalResult;
}

// Updated part2 to include the new logic
function part2(lines) {
  const parsedInput = parseInput(lines);
  return calculateFullCalibrationResult(parsedInput);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines)); // Original logic with only + and *
// console.log("Part 2:", part2(lines)); // Includes +, *, and ||

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  generateOperatorCombinations,
  evaluateEquation,
  isValidEquation,
  processEquation,
  calculateCalibrationResult,
  generateAllOperatorCombinations,
  evaluateConcatenationEquation,
  isValidConcatenationEquation,
  processConcatenationEquation,
  calculateFullCalibrationResult,
};
