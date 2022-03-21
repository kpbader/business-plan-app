const db = require('./connection.js');

class Model {
    constructor(db) {
        this.db = db;
    }

    findDepartments(){
        return this.db.promise().query(`SELECT * FROM department;`);
    }

    //findrole needs to return job title, role id, the department that role belongs to, and the salary for that role
    findRoles(){
        return this.db.promise().query(`SELECT * FROM role;`);
    }

    //findEmployees needs to display employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    findEmployees(){
        return this.db.promise().query(`SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager_table.first_name, ' ', manager_table.last_name) AS manager
    FROM
        employee
    LEFT JOIN
        role 
    ON
        employee.role_id = role.id 
    LEFT JOIN
        department 
    ON 
        role.department_id = department.id 
    LEFT JOIN
        employee manager_table
    ON 
        manager_table.id = employee.manager_id;`);
    }

    departmentAdd(department){
        return this.db.promise().query(`INSERT INTO department(name) VALUES ('${department}');`)
    }

    updateE(employeeId, roleId) {
        return this.db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
      }
}

module.exports = new Model(db);