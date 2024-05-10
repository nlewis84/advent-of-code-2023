const { parse } = require("../../../src/kata/cli_parser");
const { test, expect } = require("@jest/globals");

// test the parse function with a single flag
test("parse takes a string with a single flag", () => {
  expect(parse("--foo")).toEqual({ foo: true });
  parse("quit");
});

// test the parse function with a flag and a value
test("parse takes a string with a flag and a value", () => {
  expect(parse("--foo bar")).toEqual({ foo: "bar" });
  parse("quit");
});

// test the parse function with a flag and a number
test("parse takes a string with a flag and a number", () => {
  expect(parse("--number 1")).toEqual({ number: 1 });
  parse("quit");
});

// test the parse function with multiple flags
test("parse takes a string with multiple flags", () => {
  expect(parse("--foo --bar baz --number 1")).toEqual({
    bar: "baz",
    foo: true,
    number: 1,
  });
  parse("quit");
});

// test the parse function with an array of strings
test("parse takes an array of strings", () => {
  expect(parse(["--foo", "--bar baz", "--number 1"])).toEqual({
    bar: "baz",
    foo: true,
    number: 1,
  });
  parse("quit");
});
