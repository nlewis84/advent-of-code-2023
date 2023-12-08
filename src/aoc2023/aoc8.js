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
};
