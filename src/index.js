const fs = require('fs');
const chokidar = require('chokidar');

const nodeProcess = require('./process');

const nodemonc = scriptPath => {
  const scriptExists = fs.existsSync(scriptPath);
  if (!scriptExists) throw new Error(`Failed resolving script at ${scriptPath}`);

  const np = nodeProcess(scriptPath);
  np.init();

  chokidar.watch(scriptPath).on('change', () => {
    console.log('script changed');
    np.init();
  });

  // * terminate the running child_process before parent process exit
  process.on('beforeExit', () => {
    np.terminate();
  });
};

module.exports = nodemonc;
