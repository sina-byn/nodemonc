const { fork } = require('child_process');

const log = require('./log');

let isInitialFork = true;
let cp;

const nodeProcess = scriptPath => {
  const terminate = () => {
    // * return if there is no process to terminate
    if (!cp || cp.killed) return;

    // * terminate the process
    cp.kill();
  };

  return {
    init: () => {
      terminate();

      log.warn("to restart at any time, enter 'rs'");
      log.info(`${isInitialFork ? 'starting' : 'restarting'} 'node ${scriptPath}'`);
      cp = fork(scriptPath);

      cp.on('spawn', () => {
        log.success(`'node ${scriptPath}' successfully started`);
        isInitialFork = false;
      });

      cp.on('exit', () => {
        log.success('clean exit');
      });
    },
    terminate,
  };
};

module.exports = nodeProcess;
