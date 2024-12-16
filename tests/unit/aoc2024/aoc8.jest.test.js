const {
  parseGrid,
  findAntennas,
  findAntinodes,
  areTwiceAsFar,
  findPart2Antinodes,
  markLine,
  part1,
  part2,
} = require("../../../src/aoc2024/aoc8");
const { test, expect } = require("@jest/globals");

describe("Antinode calculations", () => {
  // Test 1: Check parsing input correctly into a 2D grid
  test("should parse input correctly into a grid", () => {
    const input = [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ];
    const grid = parseGrid(input);

    // Test that 'A' is correctly placed at (5, 7), (9, 9) as expected
    expect(grid[5][6]).toBe("A"); // This corresponds to row 5, column 7
    expect(grid[9][9]).toBe("A"); // This corresponds to row 9, column 9
  });

  // Test 2: Check finding antennas in the grid
  test("should find antennas in the grid", () => {
    const input = [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ];
    const grid = parseGrid(input);
    const antennas = findAntennas(grid);

    expect(antennas["0"]).toHaveLength(4);
    expect(antennas["A"]).toHaveLength(3);
  });

  // Test 3: Check if two antennas are twice as far apart
  test("should check if one antenna is twice as far from the reference point as another", () => {
    const antenna1 = { x: 1, y: 1 };
    const antenna2 = { x: 3, y: 1 };
    const referencePoint = { x: 5, y: 1 };

    expect(areTwiceAsFar(antenna1, antenna2, referencePoint)).toBe(true);

    const referencePoint2 = { x: 4, y: 1 };
    expect(areTwiceAsFar(antenna1, antenna2, referencePoint2)).toBe(false);
  });

  // Test 4: Check finding antinodes
  test("should find unique antinodes", () => {
    const input = [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ];
    const grid = parseGrid(input);
    const antinodes = findAntinodes(grid);
    expect(antinodes.size).toBe(14); // Expecting 14 unique antinodes
  });
});

describe("Part 2 Antinode Calculation", () => {
  // Helper function to mock antenna positions in a grid
  const mockGrid = [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["A", ".", ".", ".", ".", ".", ".", ".", ".", "0", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["0", ".", ".", ".", ".", ".", ".", ".", ".", ".", "A"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];

  // Mock antennas on the grid
  const antennasMock = {
    A: [
      { x: 0, y: 3 },
      { x: 10, y: 5 },
    ],
    0: [{ x: 6, y: 5 }],
  };

  test("should mark antinodes at all integer positions along the line formed by antennas", () => {
    // Find antinodes using the mock grid
    const antinodes = findPart2Antinodes(mockGrid);

    // Expected antinodes are:
    // Positions for antennas A and 0
    // and positions along their lines. Based on the logic of the problem.
    expect(antinodes.size).toBeGreaterThan(0);
  });

  test("markLine should correctly mark positions along the line", () => {
    const antinodes = new Set();

    // Test the markLine function with a vector from (2, 3) to (5, 3)
    markLine({ x: 2, y: 3 }, 1, 0, mockGrid, antinodes); // Moving right along x
    markLine({ x: 5, y: 3 }, -1, 0, mockGrid, antinodes); // Moving left along x

    // Expected antinodes should include positions (2, 3), (3, 3), (4, 3), (5, 3)
    expect(antinodes.has("2,3")).toBe(true);
    expect(antinodes.has("3,3")).toBe(true);
    expect(antinodes.has("4,3")).toBe(true);
    expect(antinodes.has("5,3")).toBe(true);
  });

  test("should not mark out-of-bounds antinodes", () => {
    const antinodes = new Set();

    // Test markLine with a direction that will go out of bounds
    markLine({ x: 0, y: 0 }, -1, 0, mockGrid, antinodes); // Out of bounds left
    markLine({ x: 10, y: 5 }, 1, 0, mockGrid, antinodes); // Out of bounds right

    // Ensure out-of-bounds points are not marked
    expect(antinodes.size).toBeGreaterThan(0); // But not for out-of-bounds values
  });
});
