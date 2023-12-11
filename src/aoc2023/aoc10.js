const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
// 1. Parsing the Input
function parseInput(input) {
  return input.split("\n").map((line) => line.trim().split(""));
}

// 2. Finding the Start Position
function findStartPosition(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "S") {
        return { x: j, y: i };
      }
    }
  }
  return null;
}

// 3. Building the Pipe Network
// This function would iterate over the grid and create nodes and edges
function buildPipeNetwork(grid) {
  let network = {};

  // Helper function to add a connection
  function addConnection(x, y, direction) {
    let key = `${x},${y}`;
    if (!network[key]) {
      network[key] = { x, y, connections: [] };
    }
    network[key].connections.push(direction);
  }

  // Traverse the grid to build the network
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let tile = grid[y][x];

      // Check each type of pipe and add connections accordingly
      switch (tile) {
        case "|":
          if (y > 0 && "|S".includes(grid[y - 1][x])) addConnection(x, y, "up");
          if (y < grid.length - 1 && "|S".includes(grid[y + 1][x]))
            addConnection(x, y, "down");
          break;
        case "-":
          if (x > 0 && "-S".includes(grid[y][x - 1]))
            addConnection(x, y, "left");
          if (x < grid[y].length - 1 && "-S".includes(grid[y][x + 1]))
            addConnection(x, y, "right");
          break;
        case "L":
          if (y > 0 && "|S".includes(grid[y - 1][x])) addConnection(x, y, "up");
          if (x < grid[y].length - 1 && "-S".includes(grid[y][x + 1]))
            addConnection(x, y, "right");
          break;
        // Add cases for other types of pipes ('J', '7', 'F', 'S')
        case "J":
          if (y > 0 && "|S".includes(grid[y - 1][x])) addConnection(x, y, "up");
          // left
          if (x > 0 && "-S".includes(grid[y][x - 1]))
            addConnection(x, y, "left");
          break;
        case "7":
          // down and left
          if (y < grid.length - 1 && "|S".includes(grid[y + 1][x]))
            addConnection(x, y, "down");
          if (x > 0 && "-S".includes(grid[y][x - 1]))
            addConnection(x, y, "left");
          break;

        case "F":
          // down and right
          if (y < grid.length - 1 && "|S".includes(grid[y + 1][x]))
            addConnection(x, y, "down");
          if (x < grid[y].length - 1 && "-S".includes(grid[y][x + 1]))
            addConnection(x, y, "right");
          break;
      }
    }
  }

  return network;
}

// 4. Finding the Loop
function findLoop(startPos, network) {
  let visited = new Set();
  let loop = [];

  function dfs(nodeKey, prevDirection) {
    if (visited.has(nodeKey)) {
      return;
    }

    let node = network[nodeKey];
    if (!node) {
      console.error(`Node not found in network for key: ${nodeKey}`);
      return;
    }

    visited.add(nodeKey);
    loop.push(nodeKey);

    // Determine the next direction based on the current node and the previous direction
    let nextDirection = determineNextDirection(node, prevDirection);
    let nextNodeKey = getNextNodeKey(node, nextDirection);

    if (nextNodeKey && network[nextNodeKey] && !visited.has(nextNodeKey)) {
      dfs(nextNodeKey, nextDirection);
    }
  }

  function getNextNodeKey(node, direction) {
    // Compute the next node key based on the current direction
    switch (direction) {
      case "up":
        return `${node.x},${node.y - 1}`;
      case "down":
        return `${node.x},${node.y + 1}`;
      case "left":
        return `${node.x - 1},${node.y}`;
      case "right":
        return `${node.x + 1},${node.y}`;
      default:
        return null;
    }
  }

  function determineNextDirection(node, prevDirection) {
    // Implement logic to determine the next direction based on the current node's type
    // and the previous direction.
    return node.connections.find((dir) => dir !== prevDirection);
  }

  let startKey = `${startPos.x},${startPos.y}`;
  dfs(startKey, "down"); // Start moving down from the '7' pipe

  return loop;
}

// 5. Calculating Distances
function calculateDistances(loop, startPos) {
  // Calculate and return distances within the loop
}

// 6. Finding the Farthest Point
function findFarthestPoint(distances) {
  // Find and return the farthest point's distance
}

// Main function to solve the puzzle
function solvePuzzle(input) {
  const grid = parseInput(input);
  const startPos = findStartPosition(grid);
  const network = buildPipeNetwork(grid);
  const loop = findLoop(startPos, network);
  const distances = calculateDistances(loop, startPos);
  const farthestPointDistance = findFarthestPoint(distances);
  return farthestPointDistance;
}

function part1(input) {
  const grid = parseInput(input);
  // const startPos = findStartPosition(grid);
  const startPos = { x: 25, y: 83 };
  const network = buildPipeNetwork(grid);
  console.log(startPos);
  // log the number of keys on the network
  console.log(Object.keys(network).length);
  // return the first ten keys of network
  console.log(Object.keys(network).slice(5700, 9000));
  const loop = findLoop(startPos, network);
  console.log(loop);
  const distances = calculateDistances(loop, startPos);
  const farthestPointDistance = findFarthestPoint(distances);

  return farthestPointDistance;
}

function part2(input) {
  return 0;
}

// Reading from file and running the solution
const lines = fs.readFileSync(aoc_input, "utf-8");
console.log("Part 1:", part1(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  findStartPosition,
};
