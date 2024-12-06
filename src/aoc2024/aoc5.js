const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
const parseInput = (input) => {
  const [rulesSection, updatesSection] = input.split("\n\n");
  const rules = rulesSection
    .split("\n")
    .map((rule) => rule.split("|").map(Number));
  const updates = updatesSection
    .split("\n")
    .map((update) => update.split(",").map(Number));
  return { rules, updates };
};

const isValidUpdate = (update, rules) => {
  const pageIndex = new Map(update.map((page, index) => [page, index]));

  return rules.every(([before, after]) => {
    if (pageIndex.has(before) && pageIndex.has(after)) {
      return pageIndex.get(before) < pageIndex.get(after);
    }
    return true; // Rule is ignored if one of the pages is missing
  });
};

const getMiddlePage = (update) => {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
};

const calculateMiddleSum = (rules, updates) => {
  const validUpdates = updates.filter((update) => isValidUpdate(update, rules));
  return validUpdates.reduce((sum, update) => sum + getMiddlePage(update), 0);
};

const reorderUpdate = (update, rules) => {
  const pageSet = new Set(update);
  const filteredRules = rules.filter(
    ([before, after]) => pageSet.has(before) && pageSet.has(after)
  );

  const graph = new Map();
  const inDegree = new Map();

  // Initialize graph and in-degree map
  update.forEach((page) => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });

  // Build graph and calculate in-degrees
  filteredRules.forEach(([before, after]) => {
    graph.get(before).push(after);
    inDegree.set(after, inDegree.get(after) + 1);
  });

  // Perform topological sort using Kahn's Algorithm
  const queue = [...update.filter((page) => inDegree.get(page) === 0)];
  const sorted = [];

  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    graph.get(current).forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return sorted;
};

const calculateReorderedMiddleSum = (rules, updates) => {
  const invalidUpdates = updates.filter(
    (update) => !isValidUpdate(update, rules)
  );
  const reorderedUpdates = invalidUpdates.map((update) =>
    reorderUpdate(update, rules)
  );
  return reorderedUpdates.reduce(
    (sum, update) => sum + getMiddlePage(update),
    0
  );
};

// Part 1
function part1(lines) {
  const { rules, updates } = parseInput(lines.join("\n"));
  return calculateMiddleSum(rules, updates);
}

// Part 2
function part2(lines) {
  const { rules, updates } = parseInput(lines.join("\n"));
  return calculateReorderedMiddleSum(rules, updates);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8").split("\n");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  getMiddlePage,
  isValidUpdate,
  parseInput,
  calculateMiddleSum,
  reorderUpdate,
  calculateReorderedMiddleSum,
};
