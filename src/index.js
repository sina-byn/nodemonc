const fs = require('fs');
const chokidar = require('chokidar');

const init = scriptPath => {
  const scriptExists = fs.existsSync(scriptPath);
  if (!scriptExists) throw new Error(`Failed resolving script at ${scriptPath}`);

  chokidar.watch(scriptPath).on('change', () => {
    console.log('script changed');
  });
};

init('.temp/server.js');
