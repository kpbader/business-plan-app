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
        return this.db.promise().query(`SELECT id, first_name, last_name, manager_id FROM employee;` `SELECT title, department_id, salary FROM role;`);
    }

    updatedE(){
        return this.db.promise().query(`INSERT INTO employee VALUE ?`)
    }
}

module.exports = new Model(db);