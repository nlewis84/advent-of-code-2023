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
  // Added this to make testing easier
  if (input === "quit") {
    rl.close();
  }

  // Step 5: Support String and Array inputs
  // if the input is an array, process each element separately
  if (Array.isArray(input)) {
    let result = {};

    for (let element of input) {
      let parsed = parse(element);
      Object.assign(result, parsed);
    }

    return result;
  }

  // Step 4: Support Multiple Flags
  // split the input by spaces
  let parts = input.split(" ");
  let result = {};

  for (let i = 0; i < parts.length; i++) {
    // if the part starts with "--", it's a flag
    if (parts[i].startsWith("--")) {
      let flag = parts[i];

      // if the next part doesn't start with "--", it's a value
      if (parts[i + 1] && !parts[i + 1].startsWith("--")) {
        flag += " " + parts[i + 1];
        i++; // skip the next part because it's a value
      }

      // parse the flag and its potential value, and add it to the result
      let parsed = parser(flag);
      Object.assign(result, parsed[0]);
    }
  }

  return result;
}

function parser(input) {
  // Step 1: Support Simple Flags
  // a simple flag should return as a json object with the key as true
  if (input.startsWith("--")) {
    // Step 2: Support Composite Flags
    // if the input is a flag with a value, like --foo bar, return { foo: "bar" }
    if (input.includes(" ")) {
      // Step 3: Support Integers
      // the value is an integer, return the value as an integer
      if (!isNaN(input.slice(input.indexOf(" ") + 1))) {
        return [
          {
            [input.slice(2, input.indexOf(" "))]: parseInt(
              input.slice(input.indexOf(" ") + 1)
            ),
          },
        ];
      }

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
  parse,
};
