const inquirer = require('inquirer');
const { roleAdd, updateE } = require('./db/queries.js');
const db = require('./db/queries.js');
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
          case 'Update employee role':
              updateEmployee()
              break;
          default:
              process.exit()
      }
  })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_added',
            message: 'What is the name of the department you want to add?'
        }
    ]).then((data) => {
        console.log(data);
        const department = data.department_added;
        db.departmentAdd(department);
    }).then(() => managerStart())
};

function addRole() {
    inquirer.prompt([
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
            type: 'input',
            name: 'role_department',
            message: 'What department would the new role be assigned to?',
           
        },
        // {
        //     type: 'input',
        //     name: 'department',
        //     message: 'Which department does this role belong to?'
        // }
    ]).then((data) => {
        console.log(data);
       const title = data.role_title;
       const salary = data.role_salary;
       const department = data.role_department;
       db.roleAdd(title, salary, department)
    }).then(() => managerStart())
};

function addEmployee() {
    inquirer.prompt([
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
            type: 'input',
            name: 'employee_role',
            message: 'Please enter which role the employee belongs to.',
            
        },
        //create a list of all available employees and allow the user to select the appropriate manager from the list
        {
            type: 'input',
            name: 'employees_manager',
            message: 'If employee has a manager, enter the manager name.',
        }
    ]).then((data) => {
        console.log(data);
       const firstName = data.employee_firstname;
       const lastName = data.employee_lastname;
       const employeeRole = data.employee_role;
       let employeeManager = data.employees_manager;
       employeeManager = employeeManager.split(' ');
       const fnManager = employeeManager[0];
       const lnManager = employeeManager[1];
       db.employeeAdd(firstName, lastName, employeeRole, fnManager, lnManager)
    }).then(() => managerStart())
};


// update an employee........
function updateEmployee(){
    const employeeRoleAndID = {}; 
    db.findEmployees().then(([data])=> {
        const employeeArr = data.map((emp)=> {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id 
        }
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeID',
                message: 'Which employee would you like to update?',
                choices: employeeArr
            }
        ])
        .then(data => {
            employeeRoleAndID['empID'] = data.employeeID;
        }).then(() => {
            db.findRoles().then(([data]) => {
                const roleArr = data.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleID',
                        message: 'What is the new role?',
                        choices: roleArr
                    }
                ])
                .then((data) => {
                    employeeRoleAndID['roleID'] = data.roleID
                    db.updateE(employeeRoleAndID.empID, employeeRoleAndID.roleID)
                })
            })
            
        })
    })
   
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

