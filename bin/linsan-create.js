#!/usr/bin/env node 加入这行使代码成为一个可执行文件
const program = require('commander');
const path = require('path');
const { existsSync: exists, rm } = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');
const { homedir } = require('os');
const chalk = require('chalk');

const ask = require('../lib/ask');
const checkVersion = require('../lib/check-version');

program
  .usage('[project-name]')
  .parse(process.argv)

// 创建项目的目录名
const rawName = program.args[0];
// true则表示没写或者'.'，即在当前目录下构建
const inPlace = !rawName || rawName == '.';
// 如果是在当前目录下构建，则创建项目名为当前目录名；如果不是，创建项目名则为 rawName
const projectName = inPlace ? path.relative('../', process.cwd()) : rawName;
// 创建项目目录的绝对路径
const projectPath = path.join(projectName || '.');
// 远程模板下载到本地的路径
const downloadPath = path.join(homedir, '.vue-pro-template')

const spinner = ora();

process.on('exit', () => console.log());

// 在当前目录下创建或者创建的目录名已经存在，则进行询问，否则直接执行 run 函数
if(inPlace || exists(projectPath)) {
  inquirer.prompt([
    {
      type: "confirm",
      message: inPlace ? "Generate project in current directory?" : "Target directory exists. Do you want to replace it?",
      name: "ok"
    } 
  ]).then(answers => {
    if(answers.ok) {
      console.log(chalk.yellow('Deleting old project ...'))
      if(exists(projectPath)) rm(projectPath);
      run();
    }
  })
}else {
  run();
}

function run() {
  // 收集用户的输入，再下载模版
  ask()
    .then(answers => {
      console.log("answers => ", answers);
      if(exists(downloadPath)) rm(downloadPath);
      checkVersion(() => {
        const officalTemplate = 'linshisancc/test-code'
        downloadAndGenerate(officalTemplate, answers);
      })
    })
}

function downloadAndGenerate (officialTemplate, answers) {
  spinner.start('Downloading template ...')
  download(officialTemplate, downloadPath, { clone: false }, err => {
    if (err) {
      spinner.fail('Failed to download repo ' + officialTemplate + ': ' + err.message.trim())
    } else {
      spinner.succeed('Successful download template!')
      generate(projectName, downloadPath, projectPath, answers)
    }
  })
}
