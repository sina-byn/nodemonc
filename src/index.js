const fs = require('fs');
const chokidar = require('chokidar');

const nodeProcess = require('./process');
const rl = require('./readline');
const log = require('./log');

const nodemonc = scriptPath => {
  const scriptExists = fs.existsSync(scriptPath);
  if (!scriptExists) throw new Error(`Failed resolving script at ${scriptPath}`);

  const np = nodeProcess(scriptPath);
  np.init();

  chokidar.watch(scriptPath).on('change', () => {
    np.init();
  });

  rl.listen({ rs: np.init, '.exit': process.exit });

  // * terminate the running child_process before parent process exit
  process.on('beforeExit', () => {
    np.terminate();
  });

  process.on('uncaughtException', err => {
    log.error(err);
  });
};

module.exports = nodemonc;
