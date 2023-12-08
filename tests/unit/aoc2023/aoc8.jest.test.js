const { part1, part2, navigateNetwork } = require("../../../src/aoc2023/aoc8");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

test("navigateNetwork", () => {
  const instructions = "LLR";
  const nodes = {
    AAA: ["BBB", "BBB"],
    BBB: ["AAA", "ZZZ"],
    ZZZ: ["ZZZ", "ZZZ"],
  };

  expect(navigateNetwork(instructions, nodes)).toBe(6);
});
