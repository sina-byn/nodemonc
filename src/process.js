const { fork } = require('child_process');

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

      console.log('Initiating a new process');
      cp = fork(scriptPath);

      cp.on('spawn', () => {
        console.log('Process was successfully spawned');
      });

      cp.on('error', err => {
        console.log(err);
      });

      cp.on('exit', () => {
        console.log('Running process terminated');
      });
    },
    terminate,
  };
};

module.exports = nodeProcess;
