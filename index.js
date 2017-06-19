const chalk = require('chalk');
const stringify = require('json-stringify-safe');

const colors = {
  verbose: 'cyan',
  info: 'green',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
};

const aliases = {
  err: 'error',
};

function log(color, ...args) {
  const str = args.map((arg) => {
    if (typeof arg !== 'object' || !arg) return String(arg);
    if (arg instanceof Error) return arg.stack;
    return stringify(arg);
  }).join(' ');
  console.log(chalk[color](str));
}

const logger = {
  log: console.log,
};

Object.keys(colors).forEach((x) => {
  logger[x] = log.bind(null, colors[x]);
});

Object.keys(aliases).forEach((x) => {
  logger[x] = logger[aliases[x]];
});

module.exports = logger;
