const { aoc_input, aoc_test_input } = require("../../config");
const fs = require("fs");

// Helper functions
function parseInput(input) {
  const lines = input.split("\n");
  const seeds = lines[0].split(": ")[1].split(" ").map(Number);

  const mappings = [];
  let currentMapping = [];

  lines.slice(1).forEach((line) => {
    if (line.includes("map:")) {
      if (currentMapping.length > 0) {
        mappings.push(currentMapping);
        currentMapping = [];
      }
    } else {
      const nums = line.split(" ").map(Number);
      if (nums.length === 3) {
        currentMapping.push(nums);
      }
    }
  });

  if (currentMapping.length > 0) {
    mappings.push(currentMapping);
  }

  return { seeds, mappings };
}

function mapNumber(number, mapping) {
  for (let [destStart, srcStart, length] of mapping) {
    if (number >= srcStart && number < srcStart + length) {
      return destStart + (number - srcStart);
    }
  }
  return number;
}

function findLowestLocation(seeds, mappings) {
  return seeds.map((seed) => {
    let mappedNumber = seed;
    for (let mapping of mappings) {
      mappedNumber = mapNumber(mappedNumber, mapping);
    }
    return mappedNumber;
  });
}

// Trying a different way for Part 2
function findApproximateLocation(mappings, seedRanges, stepSize) {
  // console.log("stepSize", mappings, seedRanges, stepSize);
  for (let location = 0; location <= 41119999999; location += stepSize) {
    let seed = reverseMapThroughAllMappings(location, mappings);
    if (isWithinSeedRanges(seed, seedRanges)) {
      return location;
    }
  }
  // No valid location found
  return -1;
}

function refineSearch(approxLocation, mappings, seedRanges, stepSize) {
  let start = Math.max(0, Math.floor(approxLocation - stepSize));
  let end = Math.ceil(approxLocation + stepSize);

  for (let location = start; location <= end; location++) {
    let seed = reverseMapThroughAllMappings(location, mappings);
    if (isWithinSeedRanges(seed, seedRanges)) {
      return location;
    }
  }
  // No valid location found in refined search
  return -1;
}

function createSeedRanges(seeds) {
  const ranges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    ranges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] });
  }
  return ranges;
}

function reverseMapThroughAllMappings(number, mappings) {
  let currentNumber = number;
  for (let i = mappings.length - 1; i >= 0; i--) {
    currentNumber = reverseMapNumber(currentNumber, mappings[i]);
  }
  return currentNumber;
}

function reverseMapNumber(number, mapping) {
  // console.log("reverseMapNumber", number, "mapping", mapping);
  for (let [destStart, srcStart, length] of mapping) {
    if (number >= destStart && number < destStart + length) {
      return srcStart + (number - destStart);
    }
  }
  return number;
}

function isWithinSeedRanges(seed, ranges) {
  return ranges.some((range) => seed >= range.start && seed < range.end);
}

// Part 1
function part1(lines) {
  const { seeds, mappings } = parseInput(lines);
  return findLowestLocation(seeds, mappings).sort((a, b) => a - b)[0];
}

// Part 2
function part2(lines) {
  const { seeds, mappings } = parseInput(lines);
  const seedRanges = createSeedRanges(seeds);
  const maxRange = Math.max(
    ...seeds.map((_, i) => (i % 2 === 1 ? seeds[i] : 0))
  );
  const stepSize = Math.sqrt(maxRange);

  // Find an approximate answer
  let approxLocation = findApproximateLocation(mappings, seedRanges, stepSize);

  // Refine the search around the approximate answer
  return refineSearch(approxLocation, mappings, seedRanges, stepSize);
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // other functions
  parseInput,
  mapNumber,
  findLowestLocation,
  findApproximateLocation,
  refineSearch,
  createSeedRanges,
  reverseMapThroughAllMappings,
  reverseMapNumber,
  isWithinSeedRanges,
};
