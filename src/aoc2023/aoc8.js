const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function navigateNetwork(instructions, nodes) {
  // Input: string and object; ex: "LLR" and { AAA: ("BBB", "BBB"), BBB: ("AAA", "ZZZ"), ZZZ: ("ZZZ", "ZZZ") }
  // Output: integer; ex: 3
  let current_node = "AAA";
  let steps = 0;
  let instruction_index = 0;

  while (current_node != "ZZZ") {
    const instruction = instructions[instruction_index];
    const [left_node, right_node] = nodes[current_node];

    if (instruction == "L") {
      current_node = left_node;
    } else if (instruction == "R") {
      current_node = right_node;
    }

    steps += 1;
    instruction_index = (instruction_index + 1) % instructions.length;
  }

  return steps;
}

function navigateNetworkForGhosts(instructions, nodes) {
  // Input: string and object; ex: "LLR" and { AAA: ("BBB", "BBB"), BBB: ("AAA", "ZZZ"), ZZZ: ("ZZZ", "ZZZ") }
  // Output: integer; ex: 3
  let current_nodes = getAllNodesEndingWithA(nodes);
  let steps = 0;

  while (!allNodesEndWithZ(current_nodes)) {
    let next_nodes = [];
    for (let node of current_nodes) {
      const instruction = instructions[steps % instructions.length];
      const [left_node, right_node] = nodes[node];

      if (instruction === "L") {
        next_nodes.push(left_node);
      } else if (instruction === "R") {
        next_nodes.push(right_node);
      }
    }

    current_nodes = next_nodes;
    steps += 1;
  }

  return steps;
}

function getAllNodesEndingWithA(nodes) {
  return Object.keys(nodes).filter((node) => node.endsWith("A"));
}

function allNodesEndWithZ(nodes) {
  return nodes.every((node) => node.endsWith("Z"));
}

////////////////////////////////////////////////////////////////
function findStepsFromNodeToZ(startNode, instructions, nodes) {
  let current_node = startNode;
  let steps = 0;
  let instruction_index = 0;

  while (!current_node.endsWith("Z")) {
    const instruction = instructions[instruction_index];
    const [left_node, right_node] = nodes[current_node];

    if (instruction === "L") {
      current_node = left_node;
    } else if (instruction === "R") {
      current_node = right_node;
    }

    steps += 1;
    instruction_index = (instruction_index + 1) % instructions.length;
  }

  return steps;
}

// function to return the nodes that have a key that ends with an A
function getAllNodesStartingWithA(nodes) {
  return Object.keys(nodes).filter((node) => node.endsWith("A"));
}

// Example usage
const instructions = "LR";
const nodes = {
  "11A": ["11B", "XXX"],
  "11B": ["XXX", "11Z"],
  "11Z": ["11B", "XXX"],
  "22A": ["22B", "XXX"],
  "22B": ["22C", "22C"],
  "22C": ["22Z", "22Z"],
  "22Z": ["22B", "22B"],
  XXX: ["XXX", "XXX"],
};

const startingNodes = getAllNodesStartingWithA(nodes);

const node1 = findStepsFromNodeToZ(startingNodes[0], instructions, nodes);
const node2 = findStepsFromNodeToZ(startingNodes[1], instructions, nodes);

console.log(node1, node2);

const numbers = [2, 3];

function lowestCommonMultiple(x, y) {
  return Math.abs((x * y) / greatestCommonDivisor(x, y));
}

function greatestCommonDivisor(x, y) {
  if (y === 0) {
    return x;
  } else {
    return greatestCommonDivisor(y, x % y);
  }
}

// find the LCM of numbers
let lcm = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  lcm = lowestCommonMultiple(lcm, numbers[i]);
}

console.log(lcm);

// Part 1
function part1(lines) {
  return 0;
}

// Part 2
function part2(lines) {
  return 0;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  navigateNetwork,
  getAllNodesEndingWithA,
  allNodesEndWithZ,
  navigateNetworkForGhosts,
};
