const colors = require('colors');
const { EOL } = require('os');

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

function log(color, args0, ...args) {
  if (args && args0 instanceof Error) console.log(colors[color](args0.stack + EOL));
  else args.unshift(args0);
  console.log(colors[color](args.join(' ')));
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
