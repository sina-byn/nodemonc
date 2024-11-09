#!/usr/bin/env node

const { program } = require('commander');

const nodemonc = require('../src');

program
  .name('nodemonc')
  .description('nodemonc - nodemon clone - CLI')
  .argument('<string>', 'script path to execute')
  .action(scriptPath => {
    nodemonc(scriptPath);
  });

program.parse();