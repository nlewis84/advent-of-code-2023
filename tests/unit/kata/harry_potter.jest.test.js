const { calculatePrice, books } = require("../../../src/kata/harry_potter");
const { test, expect } = require("@jest/globals");

describe("Harry Potter Books Discounted Prices", () => {
  test("buying one book should cost 8 EUR", () => {
    expect(calculatePrice([books[0]])).toBe(8);
  });

  test("buying one of each of the first two books should cost 15.20 EUR", () => {
    expect(calculatePrice([books[0], books[1]])).toBeCloseTo(15.2);
  });

  test("buying one of each of the first three books should cost 21.60 EUR", () => {
    expect(calculatePrice([books[0], books[1], books[2]])).toBeCloseTo(21.6);
  });

  test("buying one of each of the first four books should cost 25.60 EUR", () => {
    expect(
      calculatePrice([books[0], books[1], books[2], books[3]])
    ).toBeCloseTo(25.6);
  });

  test("buying one of each of all five books should cost 30.00 EUR", () => {
    expect(
      calculatePrice([books[0], books[1], books[2], books[3], books[4]])
    ).toBeCloseTo(30.0);
  });

  test("buying two of the same book should cost 16.00 EUR", () => {
    expect(calculatePrice([books[0], books[0]])).toBe(16);
  });

  test("buying two of the same book and one different should cost 23.20 EUR", () => {
    expect(calculatePrice([books[0], books[0], books[1]])).toBeCloseTo(23.2);
  });

  test("buying two of the same book and one each of two others should cost 29.60 EUR", () => {
    expect(
      calculatePrice([books[0], books[0], books[1], books[2]])
    ).toBeCloseTo(29.6);
  });

  test("buying complex combinations with repeats should calculate correctly", () => {
    expect(
      calculatePrice([
        books[0],
        books[0],
        books[1],
        books[1],
        books[2],
        books[2],
        books[3],
        books[4],
      ])
    ).toBeCloseTo(51.6);
  });
});
