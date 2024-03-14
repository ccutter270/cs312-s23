# CS312 Assignment 1

## Getting Started

Execute `npm install` to install the relevant dependencies. To execute your functions, start the Node.js REPL by executing `node`. You can then load the contents of the module with:

```javascript
let pa1 = await import("./index.js");
```

## Running tests

We place the unit tests in `index.test.js` (that is same file name but with `test.js` extensions). We run those tests with `npm test`. This invokes the test script specified in the `package.json` file. That script is equivalent to `npx jest`.

## Running the linter

We run the linter with `npm run lint`, invoking the lint script specified in the `package.json` file. That script is equivalent to `npx eslint .`. ESLint can fix many of the errors automatically by running `npm run lint -- --fix .`.


## How the skeleton was created

The module is created with `npm init`. We integrated unit testing with [Jest](https://facebook.github.io/jest/) and the [ESLint](https://eslint.org) [linter][lint] as development dependencies.

```
npm install --save-dev jest eslint
npm install --save-dev husky lint-staged prettier eslint-config-prettier
```

To prevent ESLint from trying to analyze the files you created as part of any coverage analysis you will want to also add an `.eslintignore` file with the following list of directories (or files) to be ignored:

```
# testing
/coverage
```

Similar to testing, we added a `package.json` script entry point to run the linter.

To set up husky (which runs lint and prettify on your code before it is committed to your git repository), we did the following:

```
npx husky-init
npm prepare
```

This creates a new configuration in `.husky` with a `pre-commit` hook that will run before your staged code is committed.

We edit `pre-commit` to have the following:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

Then, in `package.json`, we set up the behavior of `lint-staged` with the following configuration:

```json
  "lint-staged": {
    "*.js": "eslint --cache --fix",
    "*": "prettier --ignore-unknown --write"
  }
```

The `prepare` script will run when you run `npm install`, and it will finish the husky setup.

