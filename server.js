

const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const PORT = process.env.PORT || 3007;
const app = express();
const inquirer = require('inquirer');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
);

app.get("/api/getdepartments", (req, res) => {
    console.log("got to here");
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
        res.status(200).send(results)
}})
})


app.get("/api/getRoles", async (req, res) => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
        res.status(200).send(results)
}})
})

 
  app.get("/api/getEmplyees", async (req, res) => {
    console.log("here");
    const sqlEmployees = `SELECT employeeRoleDep.id, employeeRoleDep.first_name, employeeRoleDep.last_name, employeeRoleDep.title, employeeRoleDep.salary, employeeRoleDep.department, concat(employee.first_name," " ,employee.last_name) AS "manager"
    FROM (SELECT employee.id, employee.first_name, employee.last_name, roleDep.title, roleDep.salary,roleDep.department, employee.manager_id
    FROM employee 
    INNER JOIN (SELECT role.id, role.title, role.salary, department.name as "department"
    FROM role
    INNER JOIN department
    ON role.department_id = department.id) AS roleDep
    ON employee.role_id = roleDep.id) AS  employeeRoleDep
    LEFT JOIN employee 
    ON employee.id = employeeRoleDep.manager_id`

    db.query(sqlEmployees, function (err, results) {
    console.table(results);

    if (err) {
        console.log(err);
    }
    else {
    // res.json(JSON.parse(results));
    res.status(200).send(results)
    // JSON.parse(results);
}
  })
  });

 

  app.post("/api/addRole",async (req,res) => {
    const { title, salary, department_id } = req.body;
    const sqlAdddRole = `INSERT INTO role (title,salary,department_id)
    VALUES (?,?,?)`
    db.query(sqlAdddRole,[title, salary, department_id] ,function (err, results) {
        const showAllRoles = `SELECT * FROM role`;
        db.query(showAllRoles,function (err,results){
            if (err) {
                console.log(err);
            }
            else{
                res.status(200).send(results);
            }
        })  
       })
  });
    
  app.post("/api/addEmployee",async (req,res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const sqlAdddRole = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`
    db.query(sqlAdddRole,[first_name, last_name, role_id, manager_id ] ,function (err, results) {
        const showAllEmployees = `SELECT employeeRoleDep.id, employeeRoleDep.first_name, employeeRoleDep.last_name, employeeRoleDep.title, employeeRoleDep.salary, employeeRoleDep.department, concat(employee.first_name," " ,employee.last_name) AS "manager"
        FROM (SELECT employee.id, employee.first_name, employee.last_name, roleDep.title, roleDep.salary,roleDep.department, employee.manager_id
        FROM employee 
        INNER JOIN (SELECT role.id, role.title, role.salary, department.name as "department"
        FROM role
        INNER JOIN department
        ON role.department_id = department.id) AS roleDep
        ON employee.role_id = roleDep.id) AS  employeeRoleDep
        LEFT JOIN employee 
        ON employee.id = employeeRoleDep.manager_id`;

        db.query(showAllEmployees,function (err,results){
            if (err) {
                console.log(err);
            }
            else{
                res.status(200).send(results);
            }
        })  
        })
  });


//   update an employee
app.put("/api/employee/:id",async (req,res) => {
    const { id, role_id } = req.body;
    
    const sqlUpdateRole = `UPDATE employee
    SET role_id = ? 
    WHERE id = ?`

    db.query(sqlUpdateRole,[role_id,id] ,function (err, results) {

        const showAllRoles = `SELECT employeeRoleDep.id, employeeRoleDep.first_name, employeeRoleDep.last_name, employeeRoleDep.title, employeeRoleDep.salary, employeeRoleDep.department, concat(employee.first_name," " ,employee.last_name) AS "manager"
        FROM (SELECT employee.id, employee.first_name, employee.last_name, roleDep.title, roleDep.salary,roleDep.department, employee.manager_id
        FROM employee 
        INNER JOIN (SELECT role.id, role.title, role.salary, department.name as "department"
        FROM role
        INNER JOIN department
        ON role.department_id = department.id) AS roleDep
        ON employee.role_id = roleDep.id) AS  employeeRoleDep
        LEFT JOIN employee 
        ON employee.id = employeeRoleDep.manager_id`;

        db.query(showAllRoles,function (err,results){
            if (err) {
                console.log(err);
            }
            else{
                res.status(200).send(results);
            }
        })  
       })

  });
 
 app.use((req, res) => {
    res.status(404).end();
  });
  
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
    })

  







