const { parse } = require("../../../src/kata/cli_parser");
const { test, expect } = require("@jest/globals");

// test the parse function
test("parse takes a string", () => {
  expect(parse("--foo")).toEqual(["--foo"]);

  parse("quit");
});
