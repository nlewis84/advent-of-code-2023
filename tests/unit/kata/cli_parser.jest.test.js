const { parse } = require("../../../src/kata/cli_parser");
const { test, expect } = require("@jest/globals");

// test the parse function
test("parse takes a string", () => {
  expect(parse("--foo")).toEqual([{ foo: true }]);
  parse("quit");
  expect(parse("--foo bar")).toEqual([{ foo: "bar" }]);
  parse("quit");
  expect(parse("--number 1")).toEqual([{ number: 1 }]);
  parse("quit");
});
