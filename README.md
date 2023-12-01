# Advent of Code 2023 - TDD Javascript

Advent of Code 2023 is a yearly event where you solve a series of programming puzzles. This is the repo where I will be storing my solutions. The template this repo is based on is [here]().

### Prerequisites

- [Node 20](https://nodejs.org)
- [yarn](https://yarnpkg.com)
- [VSCode](https://code.visualstudio.com) (Preferred)

# Getting Started with the template

Make sure to build the project and pull down package dependencies by running `yarn` under the root of the template.

This tempalte is separated into two folders `src` and `tests`.
`src` will be for any features you create and `tests` is where you'll be testing against them. This isn't set up to be a web or mobile project, but it will mimic a similar project structure.

The `tests` folder is separated even further. It has different kinds of tests grouped together. Only `unit` type tests are there at the moment but `e2e` or `integration` tests can be added as well. Notice how the tests are under `unit/features`. For organization, these tests should match the folder structure as they do under `src`.

This template is already configured to work with both `jest` and `vitest` so feel free to pick your favorite and start testing.

## Solution

Run `chmod +x src/features/roman-numerals.js` to make the file executable.

`yarn jest` will test with all of my test cases

`node src/features/roman-numerals.js` will run the CLI with a spiffy ASCII art title. You can use this to test your own cases.

## Available Scripts

In the project directory, you can run:

### `yarn jest`

Runs all jest tests.

### `yarn jest:unit`

Runs all jest tests under the `unit` folder.

### `yarn vitest`

Runs all the vitest tests.

### `yarn vitest:unit`

Runs all the vitests tests under the `unit` folder.

### `yarn test: all`

Runs all jest and vitest tests.
