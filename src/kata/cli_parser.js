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

  // a simple flag should return as a json object with the key as true
  if (input.startsWith("--")) {
    // if the input is a flag with a value, like --foo bar, return { foo: "bar" }
    if (input.includes(" ")) {
      return [
        {
          [input.slice(2, input.indexOf(" "))]: input.slice(
            input.indexOf(" ") + 1
          ),
        },
      ];
    }

    return [{ [input.slice(2)]: true }];
  }
}

module.exports = {
  input,
  parse,
};
