### get roles with deparmtment name

SELECT role.id, role.title, role.salary, department.name
FROM role
INNER JOIN department
ON role.department_id = department.id;

-- ###  Y = roles with deparment name

-- ###get employee info(first namer,last name,manger id) with roles information(title,salary) with department name
-- ### Y= roles with department name, X =employee

SELECT employee.id, employee.first_name, employee.last_name, roleDep.title, roleDep.salary,roleDep.department, employee.manager_id
FROM employee 
INNER JOIN (SELECT role.id, role.title, role.salary, department.name as "department"
FROM role
INNER JOIN department
ON role.department_id = department.id) AS roleDep
ON employee.role_id = roleDep.id;

-- ### X = employees info with role info and department namer

-- ### get employees info with role info and depratment name and manager first name and last name


SELECT employeeRoleDep.id, employeeRoleDep.first_name, employeeRoleDep.last_name, employeeRoleDep.title, employeeRoleDep.salary, employeeRoleDep.department, concat(employee.first_name," " ,employee.last_name) AS "manager"
FROM (SELECT employee.id, employee.first_name, employee.last_name, roleDep.title, roleDep.salary,roleDep.department, employee.manager_id
FROM employee 
INNER JOIN (SELECT role.id, role.title, role.salary, department.name as "department"
FROM role
INNER JOIN department
ON role.department_id = department.id) AS roleDep
ON employee.role_id = roleDep.id) AS  employeeRoleDep
LEFT JOIN employee 
ON employee.id = employeeRoleDep.manager_id;


-- select table1.col1,table2.col2,...
-- from (X) AS table1
-- Where table1.col1 = something [OR/AND] table2.col2 = sonething
-- [inner/left/right] Join (Y) AS table2
-- ON X.foregin_key = Y.primary_key



