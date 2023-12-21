const fs = require("fs");
const { aoc_input } = require("../../config");

function addModule(modules, name, type) {
  modules[name] = {
    type: type,
    state: type === "flip-flop" ? "off" : undefined,
    inputs: type === "conjunction" ? {} : undefined,
    destinations: [],
  };
}

function addDestination(modules, source, destination) {
  if (!modules[source].destinations.includes(destination)) {
    modules[source].destinations.push(destination);
  }
}

function handleFlipFlop(modules, name, pulse, counters) {
  if (modules[name].state === "off" && pulse === "low") {
    modules[name].state = "on";
    propagatePulse(modules, name, "high", counters);
    counters.highPulses++;
  } else if (modules[name].state === "on" && pulse === "low") {
    modules[name].state = "off";
    propagatePulse(modules, name, "low", counters);
    counters.lowPulses++;
  }
}

function handleConjunction(modules, name, pulse, from, counters) {
  modules[name].inputs[from] = pulse;
  if (Object.values(modules[name].inputs).every((p) => p === "high")) {
    propagatePulse(modules, name, "low", counters);
    counters.lowPulses++;
  } else {
    propagatePulse(modules, name, "high", counters);
    counters.highPulses++;
  }
}

function propagatePulse(modules, source, pulse, counters) {
  modules[source].destinations.forEach((destination) => {
    if (modules[destination].type === "flip-flop") {
      handleFlipFlop(modules, destination, pulse, counters);
    } else if (modules[destination].type === "conjunction") {
      handleConjunction(modules, destination, pulse, source, counters);
    }
  });
}

function parseConfiguration(modules, configuration) {
  configuration.forEach((config) => {
    const [source, destinations] = config.split(" -> ");
    let sourceType, sourceName;

    if (source.startsWith("%")) {
      sourceType = "flip-flop";
      sourceName = source.slice(1);
    } else if (source.startsWith("&")) {
      sourceType = "conjunction";
      sourceName = source.slice(1);
    } else {
      sourceType = "broadcaster";
      sourceName = source;
    }

    if (!modules.hasOwnProperty(sourceName)) {
      addModule(modules, sourceName, sourceType);
    }

    destinations.split(", ").forEach((destination) => {
      if (!destination.trim()) return;

      let destType, destName;
      if (destination.startsWith("%")) {
        destType = "flip-flop";
        destName = destination.slice(1);
      } else if (destination.startsWith("&")) {
        destType = "conjunction";
        destName = destination.slice(1);
      } else {
        destType = "broadcaster";
        destName = destination;
      }

      if (!modules.hasOwnProperty(destName)) {
        addModule(modules, destName, destType);
      }
      addDestination(modules, sourceName, destName);
    });
  });
}

function simulate(modules, times) {
  let counters = { lowPulses: 0, highPulses: 0 };

  for (let i = 0; i < times; i++) {
    propagatePulse(modules, "broadcaster", "low", counters);
  }

  return counters.lowPulses * counters.highPulses;
}

// Part 1
function part1(lines) {
  const modules = {};
  parseConfiguration(modules, lines.split("\n"));
  return simulate(modules, 1000);
}

// Part 2
function part2(lines) {
  // Implement part 2 logic here
  return 0;
}

// Reading from file and running both parts
const lines = fs.readFileSync(aoc_input, "utf-8");
// console.log("Part 1:", part1(lines));
// console.log("Part 2:", part2(lines));

module.exports = {
  part1,
  part2,
  // Add any additional exported functions or variables here
  parseConfiguration,
  simulate,
};
