const {
  part1,
  part2,
  parseConfiguration,
  simulate,
} = require("../../../src/aoc2023/aoc20");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

describe("parseConfiguration", () => {
  test("single flip-flop module", () => {
    const modules = {};
    parseConfiguration(modules, ["broadcaster -> a", "%a -> "]);
    expect(modules).toHaveProperty("a");
    expect(modules.a.type).toBe("flip-flop");
  });

  test("single conjunction module", () => {
    const modules = {};
    parseConfiguration(modules, ["broadcaster -> a", "&a -> "]);
    expect(modules).toHaveProperty("a");
    expect(modules.a.type).toBe("conjunction");
  });

  test("multiple modules", () => {
    const modules = {};
    parseConfiguration(modules, [
      "broadcaster -> a, b",
      "%a -> c",
      "&b -> c",
      "%c -> ",
    ]);
    expect(Object.keys(modules)).toHaveLength(4);
    expect(modules).toHaveProperty("c");
    expect(modules.c.type).toBe("flip-flop");
  });
});

describe("simulate", () => {
  test("single flip-flop module", () => {
    const modules = {};
    parseConfiguration(modules, ["broadcaster -> a", "%a -> "]);
    expect(modules).toHaveProperty("a");
    expect(modules.a.type).toBe("flip-flop");
  });

  // Add more tests here following similar patterns
});
