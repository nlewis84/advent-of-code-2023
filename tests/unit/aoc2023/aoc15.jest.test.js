const {
  part1,
  part2,
  parseInput,
  determineASCIICode,
  multiplyBy17,
  findRemainderOfDivision,
  solve,
} = require("../../../src/aoc2023/aoc15");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("parse input", () => {
  const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
  expect(parseInput(input)).toEqual([
    "rn=1",
    "cm-",
    "qp=3",
    "cm=2",
    "qp-",
    "pc=4",
    "ot=9",
    "ab=5",
    "pc-",
    "pc=6",
    "ot=7",
  ]);
});

test("determine ASCII code", () => {
  expect(determineASCIICode("H")).toBe(72);
  expect(determineASCIICode("A")).toBe(65);
  expect(determineASCIICode("S")).toBe(83);
});

test("multiply by 17", () => {
  expect(multiplyBy17(100)).toBe(1700);
  expect(multiplyBy17(72)).toBe(1224);
  expect(multiplyBy17(265)).toBe(4505);
});

test("find remainder of division", () => {
  expect(findRemainderOfDivision(4148, 256)).toBe(52);
  expect(findRemainderOfDivision(4012, 256)).toBe(172);
  expect(findRemainderOfDivision(1224, 256)).toBe(200);
});

test("solve", () => {
  const input = `rn=1`;
  const input2 = `cm-`;
  const input3 = `qp=3`;
  const input4 = `cm=2`;
  const input5 = `qp-`;
  const input6 = `pc=4`;
  const input7 = `ot=9`;
  const input8 = `ab=5`;
  const input9 = `pc-`;
  const input10 = `pc=6`;
  const input11 = `ot=7`;

  expect(solve(input)).toBe(30);
  expect(solve(input2)).toBe(253);
  expect(solve(input3)).toBe(97);
  expect(solve(input4)).toBe(47);
  expect(solve(input5)).toBe(14);
  expect(solve(input6)).toBe(180);
  expect(solve(input7)).toBe(9);
  expect(solve(input8)).toBe(197);
  expect(solve(input9)).toBe(48);
  expect(solve(input10)).toBe(214);
  expect(solve(input11)).toBe(231);
});
