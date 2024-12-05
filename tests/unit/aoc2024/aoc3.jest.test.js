const {
  uncorrupt,
  sumMultiplications,
  applyDoDontLogic,
  part1,
  part2,
} = require("../../../src/aoc2024/aoc3");
const { test, expect } = require("@jest/globals");

test("uncorrupt correctly identifies valid mul(X,Y)", () => {
  const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
  const expectedMatches = ["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"];
  const matches = uncorrupt(testInput);
  expect(matches).toEqual(expectedMatches);
});

test("sumMultiplications computes the correct sum from matches", () => {
  const matches = ["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"];
  const expectedSum = 161; // 2*4 + 5*5 + 11*8 + 8*5
  const sum = sumMultiplications(matches);
  expect(sum).toBe(expectedSum);
});

test("integration test: complete flow", () => {
  const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
  const matches = uncorrupt(testInput);
  const sum = sumMultiplications(matches);
  expect(sum).toBe(161);
});

test("applyDoDontLogic filters valid mul(X,Y) based on do() and don't() instructions", () => {
  const testInput = `do()mul(2,4)%&mul[3,7]!@don't()mul(5,5)+mul(32,64](mul(11,8)do()?mul(8,5))`;
  const expectedInstructions = ["mul(2,4)", "mul(8,5)"];
  const filteredInstructions = applyDoDontLogic(testInput);
  expect(filteredInstructions).toEqual(expectedInstructions);
});

test("applyDoDontLogic handles inputs with no do() or don't()", () => {
  const testInput = `mul(2,4)mul(5,5)mul(11,8)`;
  const expectedInstructions = ["mul(2,4)", "mul(5,5)", "mul(11,8)"];
  const filteredInstructions = applyDoDontLogic(testInput);
  expect(filteredInstructions).toEqual(expectedInstructions);
});

test("applyDoDontLogic correctly disables and enables mul(X,Y)", () => {
  const testInput = `do()mul(2,4)don't()mul(5,5)do()mul(8,2)don't()mul(1,1)do()mul(9,9)`;
  const expectedInstructions = ["mul(2,4)", "mul(8,2)", "mul(9,9)"];
  const filteredInstructions = applyDoDontLogic(testInput);
  expect(filteredInstructions).toEqual(expectedInstructions);
});

test("applyDoDontLogic returns an empty array if all mul(X,Y) instructions are disabled", () => {
  const testInput = `don't()mul(2,4)mul(5,5)mul(11,8)`;
  const expectedInstructions = [];
  const filteredInstructions = applyDoDontLogic(testInput);
  expect(filteredInstructions).toEqual(expectedInstructions);
});

test("integration test: complete flow for Part 2", () => {
  const testInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
  const expectedSum = 48; // 2*4 + 8*5
  const sum = part2(testInput);
  expect(sum).toBe(expectedSum);
});

test("do() and don't() toggle behavior", () => {
  const testInput = `do()mul(2,4)don't()mul(5,5)do()mul(8,2)don't()mul(1,1)`;
  const expectedSum = 24; // 2*4 + 8*2
  const sum = part2(testInput);
  expect(sum).toBe(expectedSum);
});
