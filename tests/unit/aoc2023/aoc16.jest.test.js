const {
  part1,
  part2,
  parseInput,
  simulateBeam,
  getNext,
  move,
} = require("../../../src/aoc2023/aoc16");
const { aoc_input, aoc_test_input } = require("../../../config");
const { test, expect } = require("@jest/globals");
const fs = require("fs");

// test("parseInput() works with test input", () => {
//   const input = `.|...\....\n|.-.\.....`;

//   expect(parseInput(input)).toEqual([
//     [".", "|", ".", ".", ".", ".", ".", ".", "."],
//     ["|", ".", "-", ".", ".", ".", ".", ".", "."],
//   ]);
// });

test("simulateBeam() works with test input", () => {
  const lines = `.|...\....\n|.-.\.....\n.....|-...\n........|.\n..........\n.........\\n..../.\\..\n.-.-/..|..\n.|....-|.\\n..//.|....`;
  const input = parseInput(lines);

  expect(simulateBeam(input)).toEqual(18);
});

test("getNext() works with test input", () => {
  expect(getNext(".", "r")).toEqual(["r"]);
  expect(getNext(".", "l")).toEqual(["l"]);
  expect(getNext(".", "u")).toEqual(["u"]);
  expect(getNext(".", "d")).toEqual(["d"]);

  expect(getNext("|", "r")).toEqual(["u", "d"]);
  expect(getNext("|", "l")).toEqual(["u", "d"]);
  expect(getNext("|", "u")).toEqual(["u"]);
  expect(getNext("|", "d")).toEqual(["d"]);

  expect(getNext("-", "r")).toEqual(["r"]);
  expect(getNext("-", "l")).toEqual(["l"]);
  expect(getNext("-", "u")).toEqual(["r", "l"]);
  expect(getNext("-", "d")).toEqual(["r", "l"]);

  expect(getNext("/", "r")).toEqual(["u"]);
  expect(getNext("/", "l")).toEqual(["d"]);
  expect(getNext("/", "u")).toEqual(["r"]);
  expect(getNext("/", "d")).toEqual(["l"]);

  expect(getNext("\\", "r")).toEqual(["d"]);
  expect(getNext("\\", "l")).toEqual(["u"]);
  expect(getNext("\\", "u")).toEqual(["l"]);
  expect(getNext("\\", "d")).toEqual(["r"]);
});

test("move() works with test input", () => {
  expect(move({ x: 0, y: 0, direction: "r" }, "r")).toEqual({ x: 1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "r" }, "l")).toEqual({ x: -1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "r" }, "u")).toEqual({ x: 0, y: -1 });
  expect(move({ x: 0, y: 0, direction: "r" }, "d")).toEqual({ x: 0, y: 1 });

  expect(move({ x: 0, y: 0, direction: "l" }, "r")).toEqual({ x: 1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "l" }, "l")).toEqual({ x: -1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "l" }, "u")).toEqual({ x: 0, y: -1 });
  expect(move({ x: 0, y: 0, direction: "l" }, "d")).toEqual({ x: 0, y: 1 });

  expect(move({ x: 0, y: 0, direction: "u" }, "r")).toEqual({ x: 1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "u" }, "l")).toEqual({ x: -1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "u" }, "u")).toEqual({ x: 0, y: -1 });
  expect(move({ x: 0, y: 0, direction: "u" }, "d")).toEqual({ x: 0, y: 1 });

  expect(move({ x: 0, y: 0, direction: "d" }, "r")).toEqual({ x: 1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "d" }, "l")).toEqual({ x: -1, y: 0 });
  expect(move({ x: 0, y: 0, direction: "d" }, "u")).toEqual({ x: 0, y: -1 });
});
