INSERT INTO department (name)
VALUES
 ('Finance');

 INSERT INTO role (title, salary, department_id)
 VALUES
 ('Financial Specialist', 70000.00, 1),
 ('Finance Manager', 100000.00, 1);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES 
('Billy', 'Loomis', 2, NULL),
('Stu', 'Macher', 1, 1);