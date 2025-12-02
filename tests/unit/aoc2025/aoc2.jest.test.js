const {
  unwrapGiftRanges,
  parseGiftRange,
  isRepeatingPattern,
  isRepeatingPatternAtLeastTwice,
  findInvalidIdsInRange,
} = require("../../../src/aoc2025/aoc2");
const { test, expect } = require("@jest/globals");

// Tests for unwrapGiftRanges
test("unwrapGiftRanges parses comma-separated ranges", () => {
  const result = unwrapGiftRanges("11-22,95-115,998-1012");
  expect(result).toEqual(["11-22", "95-115", "998-1012"]);
});

test("unwrapGiftRanges handles single range", () => {
  const result = unwrapGiftRanges("11-22");
  expect(result).toEqual(["11-22"]);
});

test("unwrapGiftRanges handles ranges with spaces", () => {
  const result = unwrapGiftRanges("11-22, 95-115 , 998-1012");
  expect(result).toEqual(["11-22", "95-115", "998-1012"]);
});

// Tests for parseGiftRange
test("parseGiftRange parses range correctly", () => {
  const result = parseGiftRange("11-22");
  expect(result.start).toBe(11);
  expect(result.end).toBe(22);
});

test("parseGiftRange parses large numbers", () => {
  const result = parseGiftRange("1188511880-1188511890");
  expect(result.start).toBe(1188511880);
  expect(result.end).toBe(1188511890);
});

// Tests for isRepeatingPattern
test("isRepeatingPattern returns true for 55", () => {
  expect(isRepeatingPattern(55)).toBe(true);
});

test("isRepeatingPattern returns true for 6464", () => {
  expect(isRepeatingPattern(6464)).toBe(true);
});

test("isRepeatingPattern returns true for 123123", () => {
  expect(isRepeatingPattern(123123)).toBe(true);
});

test("isRepeatingPattern returns true for 11", () => {
  expect(isRepeatingPattern(11)).toBe(true);
});

test("isRepeatingPattern returns true for 22", () => {
  expect(isRepeatingPattern(22)).toBe(true);
});

test("isRepeatingPattern returns true for 99", () => {
  expect(isRepeatingPattern(99)).toBe(true);
});

test("isRepeatingPattern returns true for 1010", () => {
  expect(isRepeatingPattern(1010)).toBe(true);
});

test("isRepeatingPattern returns true for 1188511885", () => {
  expect(isRepeatingPattern(1188511885)).toBe(true);
});

test("isRepeatingPattern returns true for 222222", () => {
  expect(isRepeatingPattern(222222)).toBe(true);
});

test("isRepeatingPattern returns true for 446446", () => {
  expect(isRepeatingPattern(446446)).toBe(true);
});

test("isRepeatingPattern returns true for 38593859", () => {
  expect(isRepeatingPattern(38593859)).toBe(true);
});

test("isRepeatingPattern returns false for odd-length numbers", () => {
  expect(isRepeatingPattern(123)).toBe(false);
  expect(isRepeatingPattern(12345)).toBe(false);
});

test("isRepeatingPattern returns false for non-repeating even-length numbers", () => {
  expect(isRepeatingPattern(1234)).toBe(false);
  expect(isRepeatingPattern(101)).toBe(false);
});

test("isRepeatingPattern returns false for 12", () => {
  expect(isRepeatingPattern(12)).toBe(false);
});

// Tests for findInvalidIdsInRange with Part 1 validation
test("findInvalidIdsInRange finds 11 and 22 in range 11-22 (Part 1)", () => {
  const result = findInvalidIdsInRange(11, 22, isRepeatingPattern);
  expect(result).toEqual([11, 22]);
});

test("findInvalidIdsInRange finds 99 in range 95-115 (Part 1)", () => {
  const result = findInvalidIdsInRange(95, 115, isRepeatingPattern);
  expect(result).toEqual([99]);
});

test("findInvalidIdsInRange finds 1010 in range 998-1012 (Part 1)", () => {
  const result = findInvalidIdsInRange(998, 1012, isRepeatingPattern);
  expect(result).toEqual([1010]);
});

test("findInvalidIdsInRange finds 1188511885 in range 1188511880-1188511890 (Part 1)", () => {
  const result = findInvalidIdsInRange(
    1188511880,
    1188511890,
    isRepeatingPattern
  );
  expect(result).toEqual([1188511885]);
});

test("findInvalidIdsInRange finds 222222 in range 222220-222224 (Part 1)", () => {
  const result = findInvalidIdsInRange(222220, 222224, isRepeatingPattern);
  expect(result).toEqual([222222]);
});

test("findInvalidIdsInRange finds no invalid IDs in range 1698522-1698528 (Part 1)", () => {
  const result = findInvalidIdsInRange(1698522, 1698528, isRepeatingPattern);
  expect(result).toEqual([]);
});

test("findInvalidIdsInRange finds 446446 in range 446443-446449 (Part 1)", () => {
  const result = findInvalidIdsInRange(446443, 446449, isRepeatingPattern);
  expect(result).toEqual([446446]);
});

test("findInvalidIdsInRange finds 38593859 in range 38593856-38593862 (Part 1)", () => {
  const result = findInvalidIdsInRange(38593856, 38593862, isRepeatingPattern);
  expect(result).toEqual([38593859]);
});

// Tests for isRepeatingPatternAtLeastTwice
test("isRepeatingPatternAtLeastTwice returns true for 111", () => {
  expect(isRepeatingPatternAtLeastTwice(111)).toBe(true); // "1" repeated 3 times
});

test("isRepeatingPatternAtLeastTwice returns true for 999", () => {
  expect(isRepeatingPatternAtLeastTwice(999)).toBe(true); // "9" repeated 3 times
});

test("isRepeatingPatternAtLeastTwice returns true for 12341234", () => {
  expect(isRepeatingPatternAtLeastTwice(12341234)).toBe(true); // "1234" repeated 2 times
});

test("isRepeatingPatternAtLeastTwice returns true for 123123123", () => {
  expect(isRepeatingPatternAtLeastTwice(123123123)).toBe(true); // "123" repeated 3 times
});

test("isRepeatingPatternAtLeastTwice returns true for 1212121212", () => {
  expect(isRepeatingPatternAtLeastTwice(1212121212)).toBe(true); // "12" repeated 5 times
});

test("isRepeatingPatternAtLeastTwice returns true for 1111111", () => {
  expect(isRepeatingPatternAtLeastTwice(1111111)).toBe(true); // "1" repeated 7 times
});

test("isRepeatingPatternAtLeastTwice returns true for 565656", () => {
  expect(isRepeatingPatternAtLeastTwice(565656)).toBe(true); // "56" repeated 3 times
});

test("isRepeatingPatternAtLeastTwice returns true for 824824824", () => {
  expect(isRepeatingPatternAtLeastTwice(824824824)).toBe(true); // "824" repeated 3 times
});

test("isRepeatingPatternAtLeastTwice returns true for 2121212121", () => {
  expect(isRepeatingPatternAtLeastTwice(2121212121)).toBe(true); // "21" repeated 5 times
});

test("isRepeatingPatternAtLeastTwice returns true for 11", () => {
  expect(isRepeatingPatternAtLeastTwice(11)).toBe(true); // "1" repeated 2 times
});

test("isRepeatingPatternAtLeastTwice returns true for 22", () => {
  expect(isRepeatingPatternAtLeastTwice(22)).toBe(true); // "2" repeated 2 times
});

test("isRepeatingPatternAtLeastTwice returns true for 99", () => {
  expect(isRepeatingPatternAtLeastTwice(99)).toBe(true); // "9" repeated 2 times
});

test("isRepeatingPatternAtLeastTwice returns true for 1010", () => {
  expect(isRepeatingPatternAtLeastTwice(1010)).toBe(true); // "10" repeated 2 times
});

test("isRepeatingPatternAtLeastTwice returns false for 1234", () => {
  expect(isRepeatingPatternAtLeastTwice(1234)).toBe(false); // no repeating pattern
});

test("isRepeatingPatternAtLeastTwice returns false for 123", () => {
  expect(isRepeatingPatternAtLeastTwice(123)).toBe(false); // too short, can't repeat
});

test("isRepeatingPatternAtLeastTwice returns false for 12", () => {
  expect(isRepeatingPatternAtLeastTwice(12)).toBe(false); // no repeating pattern
});

// Tests for findInvalidIdsInRange with Part 2 validation
test("findInvalidIdsInRange finds 11 and 22 in range 11-22 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    11,
    22,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([11, 22]);
});

test("findInvalidIdsInRange finds 99 and 111 in range 95-115 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    95,
    115,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([99, 111]);
});

test("findInvalidIdsInRange finds 999 and 1010 in range 998-1012 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    998,
    1012,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([999, 1010]);
});

test("findInvalidIdsInRange finds 1188511885 in range 1188511880-1188511890 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    1188511880,
    1188511890,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([1188511885]);
});

test("findInvalidIdsInRange finds 222222 in range 222220-222224 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    222220,
    222224,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([222222]);
});

test("findInvalidIdsInRange finds no invalid IDs in range 1698522-1698528 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    1698522,
    1698528,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([]);
});

test("findInvalidIdsInRange finds 446446 in range 446443-446449 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    446443,
    446449,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([446446]);
});

test("findInvalidIdsInRange finds 38593859 in range 38593856-38593862 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    38593856,
    38593862,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([38593859]);
});

test("findInvalidIdsInRange finds 565656 in range 565653-565659 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    565653,
    565659,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([565656]);
});

test("findInvalidIdsInRange finds 824824824 in range 824824821-824824827 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    824824821,
    824824827,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([824824824]);
});

test("findInvalidIdsInRange finds 2121212121 in range 2121212118-2121212124 (Part 2)", () => {
  const result = findInvalidIdsInRange(
    2121212118,
    2121212124,
    isRepeatingPatternAtLeastTwice
  );
  expect(result).toEqual([2121212121]);
});

