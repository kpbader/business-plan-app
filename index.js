const inquirer = require('inquirer');
const db = require('./db/queries');
require('console.table');


function start(){
    managerStart()
}
start();

// inquirer prompts ................
function managerStart() {
    inquirer.prompt([
    {
        type: 'list',
        name: 'navigator',
        message: 'Which of the following would you like to do?',
        choices: ['View departments',
                   'View roles',
                   'View employees',
                   'Add department',
                   'Add role',
                   'Add employee',
                   'Update employee role', 
                'Quit' ]
    }
  ]).then(data => {
      switch (data.navigator) {
          case 'View departments':
              viewDepartments()
              break;
          case 'View roles':
              viewRoles()
              break;  
          case 'View employees':
              viewEmployees()
              break;   
          case 'Add department':
              addDepartment()
              break;   
          case 'Add role':
              addRole()
              break;
          case 'Add employee':
              addEmployee()           
              break;
          case 'Update employee':
              updateEmployee()
              break;
          default:
              process.exit()
      }
  })
};

function addDepartment() {
    inquier.prompt([
        {
            type: 'input',
            name: 'department_added',
            message: 'What is the name of the department you want to add?'
        }
    ])
};

function addRole() {
    inquier.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: 'What role would you like to add?',
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'What is the salary of this role?'
        },
        //create a list of all available departments and allow the user to select the appropriate department from the list
        {
            type: 'list',
            name: 'department_list',
            message: 'What department would the new role be assigned to?',
            choices: [
                'Finance',
                'Design',
                'Logistics',
                'Advertising'
            ]
        },
        // {
        //     type: 'input',
        //     name: 'department',
        //     message: 'Which department does this role belong to?'
        // }
    ])
};

function addEmployee() {
    inquier.prompt([
        {
            type: 'input',
            name: 'employee_firstname',
            message: 'Enter first name of the employee'
        },
        {
            type: 'input',
            name: 'employee_lastname',
            message: 'Enter last name of the employee'
        },

        //create a list of all the avaialble roles and allow the user to select one from the list
        {
            type: 'list',
            name: 'employee_role',
            message: 'Please select which role the employee belongs to.',
            choices: [
                
            ]
        },
        //create a list of all available employees and allow the user to select the appropriate manager from the list
        {
            type: 'list',
            name: 'employees_manager',
            message: 'If employee has a manager, select the manager name.',
            choices: [
            
            ]
        }
    ])
};


// update an employee........
function updateEmployee(){
    db.updatedE().then(([data]) => {
        
    }).then(()=> managerStart())
};

// view departments........
function viewDepartments(){
    db.findDepartments().then(([data])=>{
        console.table(data)
    }).then(()=> managerStart())
};
// view roles........
function viewRoles(){
    db.findRoles().then(([data])=>{
        console.table(data)
    }).then(()=> managerStart())
};

// view employees........
function viewEmployees(){
    db.findEmployees().then(([data])=>{
        console.table(data)
    }).then(()=> managerStart())
};


