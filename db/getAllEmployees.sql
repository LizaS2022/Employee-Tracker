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