const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseWorkflows(input) {
  const workflows = {};
  const workflowLines = input.split("\n").filter((line) => line.includes("{"));
  workflowLines.forEach((line) => {
    const [name, rulesStr] = line.split("{");
    const rules = rulesStr
      .slice(0, -1)
      .split(",")
      .map((ruleStr) => {
        const parts = ruleStr.split(":");
        // If there's no explicit action, use the rule itself as the action
        return {
          condition: parts.length === 2 ? parts[0] : undefined,
          action: parts.length === 2 ? parts[1] : parts[0],
        };
      });
    workflows[name.trim()] = rules;
  });
  return workflows;
}

function parseParts(input) {
  return input
    .split("\n")
    .filter((line) => line.startsWith("{"))
    .map((partStr) => {
      const ratings = partStr
        .slice(1, -1)
        .split(",")
        .map((x) => x.split("="))
        .reduce(
          (acc, [key, val]) => ({ ...acc, [key.trim()]: parseInt(val, 10) }),
          {}
        );
      return ratings;
    });
}

function evaluateRules(part, workflow) {
  console.log(`Evaluating part in workflow:`, workflow);
  for (let i = 0; i < workflow.length; i++) {
    const rule = workflow[i];
    console.log(`Evaluating rule:`, rule);

    // Direct accept or reject without condition
    if ((rule.action === "A" || rule.action === "R") && !rule.condition) {
      console.log(`Part ${rule.action === "A" ? "accepted" : "rejected"}`);
      return rule.action === "A" ? "accepted" : "rejected";
    }

    // Evaluate conditions
    if (rule.condition) {
      const [attribute, operator, value] = rule.condition.split(/([<>])/);
      const partValue = part[attribute.trim()];
      console.log(
        `Part value for ${attribute.trim()}: ${partValue}, condition: ${operator}${value}`
      );

      if (
        (operator === ">" && partValue > parseInt(value)) ||
        (operator === "<" && partValue < parseInt(value))
      ) {
        console.log(`Condition met, action is: ${rule.action}`);
        // Check if action is 'A' or 'R' or another workflow
        if (rule.action === "A" || rule.action === "R") {
          return rule.action === "A" ? "accepted" : "rejected";
        } else {
          return rule.action; // Next workflow
        }
      }
    }

    // If the last rule is reached without meeting any condition, then it's a direct workflow transition or final action
    if (i === workflow.length - 1 && rule.action !== undefined) {
      console.log(`Last rule reached, action is: ${rule.action}`);
      if (rule.action === "A" || rule.action === "R") {
        return rule.action === "A" ? "accepted" : "rejected";
      } else {
        return rule.action; // Next workflow
      }
    }
  }
}

function processPart(part, workflows) {
  let currentWorkflow = "in";
  console.log(`Starting process for part:`, part);

  while (currentWorkflow) {
    console.log(`Current workflow: ${currentWorkflow}`);
    const workflow = workflows[currentWorkflow];
    const result = evaluateRules(part, workflow);

    console.log(`Result from evaluateRules: ${result}`);

    if (result === "accepted" || result === "rejected") {
      console.log(`Part processing finished, final status: ${result}`);
      return result;
    }

    currentWorkflow = result;
    console.log(`Switching to next workflow: ${currentWorkflow}`);
  }
}

function countAccepted(workflows, ranges, currentWorkflow = "in") {
  if (currentWorkflow === "A") {
    // If the current workflow is 'A', calculate the product of the range sizes
    return Object.values(ranges).reduce(
      (product, [lo, hi]) => product * (hi - lo + 1),
      1
    );
  }

  if (currentWorkflow === "R") {
    // If the current workflow is 'R', no combinations are accepted
    return 0;
  }

  const rules = workflows[currentWorkflow];
  let total = 0;

  for (const rule of rules) {
    if (!rule.condition) {
      total += countAccepted(workflows, ranges, rule.action);
      continue;
    }

    const [varName, operator, valueStr] = rule.condition.split(/([<>])/);
    const value = parseInt(valueStr, 10);
    const [lo, hi] = ranges[varName];

    if (operator === "<" && lo < value) {
      const newRanges = { ...ranges, [varName]: [lo, value - 1] };
      total += countAccepted(workflows, newRanges, rule.action);
    }

    if (operator === ">" && hi > value) {
      const newRanges = { ...ranges, [varName]: [value + 1, hi] };
      total += countAccepted(workflows, newRanges, rule.action);
    }

    ranges[varName] = operator === "<" ? [value, hi] : [lo, value];
  }

  return total;
}

// Part 1
function part1(lines) {
  const workflows = parseWorkflows(lines);
  const parts = parseParts(lines);
  let totalRating = 0;

  parts.forEach((part) => {
    const result = processPart(part, workflows);
    if (result === "accepted") {
      totalRating += Object.values(part).reduce((sum, val) => sum + val, 0);
    }
  });

  return totalRating;
}

// Part 2
function part2(workflows) {
  const parsedWorkflows = parseWorkflows(workflows);
  const initialRanges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  };
  return countAccepted(parsedWorkflows, initialRanges);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
};
