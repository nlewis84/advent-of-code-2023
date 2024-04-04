const { roll, score } = require("../../../src/kata/greed");
const { test, expect } = require("@jest/globals");

// Test the Greed Kata
test("Roll the Dice", () => {
  const dice = roll();
  expect(dice.length).toBe(5);
  dice.forEach((die) => {
    expect(die).toBeGreaterThanOrEqual(1);
    expect(die).toBeLessThanOrEqual(6);
  });
});

test("Score the Dice", () => {
  expect(score([1, 1, 1, 5, 1])).toBe(1150);
  expect(score([2, 3, 4, 6, 2])).toBe(0);
  expect(score([3, 4, 5, 3, 3])).toBe(350);
  expect(score([1, 5, 1, 2, 4])).toBe(250);
  expect(score([5, 5, 5, 5, 5])).toBe(600);
  expect(score([1, 1, 1, 1, 1])).toBe(1200);
  expect(score([6, 6, 6, 6, 6])).toBe(600);
  expect(score([2, 2, 2, 2, 2])).toBe(200);
  expect(score([3, 3, 3, 3, 3])).toBe(300);
  expect(score([4, 4, 4, 4, 4])).toBe(400);
  expect(score([1, 1, 1, 1, 1])).toBe(1200);
  expect(score([5, 5, 5, 5, 5])).toBe(600);
});
