const {
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
  part1,
  part2,
} = require("../../../src/aoc2024/aoc7");
const { test, expect } = require("@jest/globals");

test("parseInput correctly parses the input", () => {
  const input = ["190: 10 19", "3267: 81 40 27", "292: 11 6 16 20"];

  const expectedOutput = [
    { testValue: 190, numbers: [10, 19] },
    { testValue: 3267, numbers: [81, 40, 27] },
    { testValue: 292, numbers: [11, 6, 16, 20] },
  ];

  expect(parseInput(input)).toEqual(expectedOutput);
});

test("generateOperatorCombinations generates all combinations of operators", () => {
  const numCount = 3;
  const expectedOutput = [
    ["+", "+"],
    ["+", "*"],
    ["*", "+"],
    ["*", "*"],
  ];

  expect(generateOperatorCombinations(numCount)).toEqual(expectedOutput);
});

test("evaluateEquation evaluates the equation left-to-right", () => {
  const numbers = [10, 19];
  const operators = ["*"];

  expect(evaluateEquation(numbers, operators)).toBe(190);

  const numbers2 = [81, 40, 27];
  const operators2 = ["+", "*"];

  expect(evaluateEquation(numbers2, operators2)).toBe(3267);
});

test("isValidEquation checks if an equation matches the test value", () => {
  const testValue = 190;
  const numbers = [10, 19];
  const operatorCombination = ["*"];

  expect(isValidEquation(testValue, numbers, operatorCombination)).toBe(true);

  const operatorCombinationInvalid = ["+"];
  expect(isValidEquation(testValue, numbers, operatorCombinationInvalid)).toBe(
    false
  );
});

test("processEquation finds the correct test value if valid", () => {
  const equation = {
    testValue: 3267,
    numbers: [81, 40, 27],
  };

  expect(processEquation(equation)).toBe(3267);

  const invalidEquation = {
    testValue: 101,
    numbers: [10, 10],
  };

  expect(processEquation(invalidEquation)).toBe(0);
});

test("calculateCalibrationResult sums valid test values", () => {
  const parsedInput = [
    { testValue: 190, numbers: [10, 19] },
    { testValue: 3267, numbers: [81, 40, 27] },
    { testValue: 292, numbers: [11, 6, 16, 20] },
    { testValue: 101, numbers: [10, 10] },
  ];

  expect(calculateCalibrationResult(parsedInput)).toBe(3749);
});

test("part1 solves the example input", () => {
  const input = [
    "190: 10 19",
    "3267: 81 40 27",
    "292: 11 6 16 20",
    "101: 10 10",
  ];

  expect(part1(input)).toBe(3749);
});

test("part2 solves the example input (same as part1)", () => {
  const input = [
    "190: 10 19",
    "3267: 81 40 27",
    "292: 11 6 16 20",
    "101: 10 10",
  ];

  expect(part2(input)).toBe(3749);
});

test("generateAllOperatorCombinations generates all combinations of +, *, and ||", () => {
  const numCount = 3;
  const expectedOutput = [
    ["+", "+"],
    ["+", "*"],
    ["+", "||"],
    ["*", "+"],
    ["*", "*"],
    ["*", "||"],
    ["||", "+"],
    ["||", "*"],
    ["||", "||"],
  ];

  expect(generateAllOperatorCombinations(numCount)).toEqual(expectedOutput);
});

test("evaluateConcatenationEquation evaluates equations with concatenation", () => {
  const numbers = [6, 8, 6, 15];
  const operators1 = ["*", "||", "*"];
  const operators2 = ["||", "+", "||"];
  const operators3 = ["+", "*", "||"];

  expect(evaluateConcatenationEquation(numbers, operators1)).toBe(7290);
  expect(evaluateConcatenationEquation(numbers, operators2)).toBe(7415);
  expect(evaluateConcatenationEquation(numbers, operators3)).toBe(8415);
});

test("isValidConcatenationEquation checks if an equation is valid", () => {
  const testValue = 156;
  const numbers = [15, 6];
  const operatorCombinationValid = ["||"];
  const operatorCombinationInvalid = ["+"];

  expect(
    isValidConcatenationEquation(testValue, numbers, operatorCombinationValid)
  ).toBe(true);
  expect(
    isValidConcatenationEquation(testValue, numbers, operatorCombinationInvalid)
  ).toBe(false);
});

test("processConcatenationEquation finds valid test values", () => {
  const equationValid = {
    testValue: 7290,
    numbers: [6, 8, 6, 15],
  };
  const equationInvalid = {
    testValue: 21037,
    numbers: [9, 7, 18, 13],
  };

  expect(processConcatenationEquation(equationValid)).toBe(7290);
  expect(processConcatenationEquation(equationInvalid)).toBe(0);
});

test("calculateFullCalibrationResult sums valid test values with all operators", () => {
  const parsedInput = [
    { testValue: 156, numbers: [15, 6] },
    { testValue: 7290, numbers: [6, 8, 6, 15] },
    { testValue: 192, numbers: [17, 8, 14] },
    { testValue: 101, numbers: [10, 10] },
  ];

  // Only the first three equations are valid
  expect(calculateFullCalibrationResult(parsedInput)).toBe(7638);
});
