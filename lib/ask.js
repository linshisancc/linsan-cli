const { prompt } = require("inquirer");

const questions = [
  {
    name: "name",
    type: "string",
    required: true,
    message: "Project Name",
  },
  {
    name: "description",
    type: "string",
    required: false,
    message: "Description",
  },
  {
    name: "author",
    type: "string",
    message: "Author",
  },
  {
    name: "git",
    type: "confirm",
    message: "Use git to initialize the local repository？",
  },
  {
    name: "eslint",
    type: "list",
    message: "Pick an eslint extends",
    choices: [
      {
        name: "recommended",
        value: "recommended",
        short: "recommended",
      },
      {
        name: "strongly-recommended",
        value: "strongly-recommended",
        short: "strongly-recommended",
      },
      {
        name: "essential",
        value: "essential",
        short: "essential",
      },
    ],
  },
  {
    name: "autoInstall",
    type: "list",
    message: "Should we run `npm install` for you after the project has been created? (recommended)",
    choices: [
      {
        name: "Yes, use NPM",
        value: "Npm",
        short: "Npm",
      },
      {
        name: "No, I will handle that myself",
        value: false,
        short: "no",
      },
    ],
  },
];

module.exports = () => {
  return prompt(questions).then(answers => {
    return answers;
  })
}