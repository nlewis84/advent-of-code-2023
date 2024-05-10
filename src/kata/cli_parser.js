const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// A CLI Argument Parser
// First, we need to ask the user for an input
function input(options) {
  return new Promise((resolve) => {
    rl.question(options, (answer) => {
      resolve(answer);
    });
  });
}

function parse(input) {
  // if input is quit, close the readline interface
  if (input === "quit") {
    rl.close();
  }

  return input.split("\n").filter((line) => line);
}

module.exports = {
  input,
  parse,
};
