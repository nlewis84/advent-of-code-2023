const {
  part1,
  part2,
  navigateNetwork,
  getAllNodesEndingWithA,
  allNodesEndWithZ,
  navigateNetworkForGhosts,
} = require("../../../src/aoc2023/aoc8");
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

test("getAllNodesEndingWithA", () => {
  const nodes = {
    AAA: ["BBB", "BBB"],
    BBB: ["AAA", "ZZZ"],
    ZZZ: ["ZZZ", "ZZZ"],
  };

  const nodes2 = {
    AAA: ["BBB", "BBB"],
    BBB: ["AAA", "ZZZ"],
    ZZZ: ["ZZZ", "ZZZ"],
    ZZA: ["ZZZ", "ZZZ"],
  };

  const nodes3 = {
    AAA: ["BBB", "BBB"],
    BBB: ["AAA", "ZZZ"],
    ZZZ: ["ZZZ", "ZZZ"],
    ZZA: ["ZZZ", "ZZZ"],
    ZAA: ["ZZZ", "ZZZ"],
  };

  expect(getAllNodesEndingWithA(nodes)).toEqual(["AAA"]);
  expect(getAllNodesEndingWithA(nodes2)).toEqual(["AAA", "ZZA"]);
  expect(getAllNodesEndingWithA(nodes3)).toEqual(["AAA", "ZZA", "ZAA"]);
});

test("allNodesEndWithZ", () => {
  const nodes = {
    AAA: ["BBB", "BBB"],
    BBB: ["AAA", "ZZZ"],
    ZZZ: ["ZZZ", "ZZZ"],
  };

  expect(allNodesEndWithZ(["AAA", "BBB"])).toBe(false);
  expect(allNodesEndWithZ(["ZZZ", "ZZZ"])).toBe(true);
  expect(allNodesEndWithZ(["ZZZ", "AAB", "CDI", "ZZZ"])).toBe(false);
});

test("navigateNetworkForGhosts", () => {
  const instructions =
    "LRRLRRLRLLLRLLRLRRLRRLRRLRRLLRLLRRRLRRRLRRLLLRLRRLLLLLRRRLRRRLRRRLRRLRRLRLRLRLRLRRRLRRRLRRRLRRLRRLRLRLRRLLRRRLLRRLRRLRRRLRLLRRLRRLRRRLRRRLRRRLRRRLRRLLLRRRLLRRLLLRRLRRLLRRLRRRLRRLRRLRRRLRRLLLRLRRRLLRRRLRLRRLRLRLRLRRRLRLRLRRLLRRLRRLRRLRRLLRLRLRRRLRRLRRLRRLRLRRRLRRLRLLRRLLRRLRLLLRLLRRRLRLRLLRRRR";
  const nodes = {
    AAA: ["BBB", "BBB"],
    BBB: ["AAA", "ZZZ"],
    ZZZ: ["ZZZ", "ZZZ"],
  };

  expect(navigateNetworkForGhosts(instructions, nodes)).toBe(2);
});
