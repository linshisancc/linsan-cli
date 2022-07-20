#!/usr/bin/env node 加入这行使代码成为一个可执行文件
const program = require('commander');

// commander 会找到同文件夹下的 linsan-create 并调用
program
  .version(require("../package.json").version)
  .usage('<command> [options]')
  .command('create', 'create a new project ~')
  .parse(process.argv);
