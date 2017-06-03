const colors = require('colors');
const { EOL } = require('os');
const stringify = require('json-stringify-safe');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

function log(color, ...args) {
  const str = args.map((arg) => {
    if (arg) {
      if (arg instanceof Error) return arg.stack;
      if (arg instanceof Function) return arg;
      if (arg instanceof Object) return stringify(arg);
    }
    return arg;
  }).join(' ');
  console.log(colors[color](str));
}

function bind(fn, ...args) {
  return fn.bind(null, ...args);
}

const logger = {};

logger.log = (...args) => console.log(...args);
logger.warn = bind(log, 'warn');
logger.error = bind(log, 'error');
logger.err = bind(log, 'error');
logger.info = bind(log, 'info');
logger.debug = bind(log, 'debug');
logger.verbose = bind(log, 'verbose');

module.exports = logger;
