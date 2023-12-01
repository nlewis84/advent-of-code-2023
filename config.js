// config.js
const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/.env`,
});
module.exports = {
  aoc_input: process.env.AOC_INPUT,
};
