const { createInterface } = require('readline');

const rl = {
  listen: commands => {
    const _rl = createInterface(process.stdin);

    _rl.on('line', input => {
      input = input.trim();

      if (input in commands) commands[input]();
    });
  },
};

module.exports = rl;
