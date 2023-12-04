// config.js
const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/.env`,
});
module.exports = {
  aoc_input: process.env.AOC_INPUT,
  aoc_test_input: process.env.AOC_TEST_INPUT,
};
