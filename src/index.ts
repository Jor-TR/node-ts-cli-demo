#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from "chalk";

type Question = (typeof inquirer.prompt) extends (arr: Array<infer K>) => any ? K : never;

const program = new Command();
program
  .version('1.0.0')
  .option('-n, --name', '是否询问姓名')
  .option('-s, --sex', '是否询问性别')
  .option('-a, --age', '是否询问年龄')
  .option('-l, --like', '是否询问喜好')
  .parse(process.argv);

const options = program.opts();

const option2question: Record<string, Question> = {
  name: {
    name: 'name',
    type: 'input',
    message: '您的姓名是？',
    default: '不具名帅哥',
  },
  sex: {
    name: 'sex',
    type: 'list',
    message: '您的性别是？',
    choices: ['男', '女'],
    default: '男',
  },
  age: {
    name: 'age',
    type: 'number',
    message: '您的年龄是？',
  },
  like: {
    name: 'like',
    type: 'confirm',
    message: '您喜欢红楼梦吗？',
    default: true,
  },
};
const questionList = Object.keys(options).map(key => option2question[key]);
const sleep = (ms: number): Promise<number> => new Promise(resolve => setTimeout(resolve, ms, ms));
const sendQuestions = async (questionList: Question[], wait = 2000): Promise<void> => {
  const answers = await inquirer.prompt(questionList);
  
  const spinner = ora('waiting~').start();
  await sleep(wait);
  spinner.succeed();
  
  console.log(chalk.greenBright('您的选择如下:'));
  console.log(chalk.yellowBright(JSON.stringify(answers)));
};
sendQuestions(questionList);