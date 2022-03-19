const inquirer = require('inquirer');
require('console.table');
const db = require('./db/connection');

const qList = [
    {
        type: 'list',
        name: 'choices',
        message: 'Which of the following would you like to do?',
        choices: ['View departments',
                   'View roles',
                   'View employees',
                   'Add department',
                   'Add role',
                   'Add employee',
                   'Update employee role' ]
    }
];

// inquirer prompts ................

