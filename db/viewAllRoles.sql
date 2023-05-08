SELECT role.id, role.title, role.salary, department.name as "department"
FROM role
INNER JOIN department
ON role.department_id = department.id;