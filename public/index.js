const inquirer = require('inquirer');
// const fs = require('fs');
const express = require('express');

// const companyDB = require("server.js");
const PORT = process.env.PORT || 3040;
//receiving input ...camelcase ... sending the input to server js with post command ...

//for today: prompt to get department , sending post to server.js, 
const app = express(); 

function userPrompt(){

    inquirer
    .prompt ([
        {
            type: "list", 
            name: "view",
            message: "What would you like to do?", 
            choices: ["View All Employees","Add Employee", "View All Roles", "Add Role", "View All Departments", "Quit"]
        }

    ])
    .then ((answers) => {
        console.log(answers.view);
        switch(answers.view) {

            case "View All Employees":
                console.log("view employees");
                displayEmployees();
                break;
                

            case "Add Employee":
                console.log("add employee");
                addEmployee();
                break;

            case "View All Roles":
                console.log("view all roles");
                displayRoles();
                break;

            case "Add Role":
                console.log("add role");
                 addRole();
                 break;
                 

            case "View All Departments":
                console.log("got to department");
                var viewDepartments = displayDepartments();
                console.table(viewDepartments);
                break;

            case "quit":
                break;

            
            default:
            console.log("not a valid request");
        }
        })

        .catch((error) => {
            if (error.isTypeError) {
                console.log(error.message);
            }
        
        })

};
userPrompt();



function displayDepartments(){
  
    fetch("http://localhost:3007/api/getdepartments")
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
    })
    .then((data) => {
    // Handle the data here, e.g., display it on the page or manipulate it as needed.
    console.table(data);
    })
    .catch((error) => {
    // Handle any errors that occurred during the fetch request.
    console.error('Error fetching notes:', error);
});
}


function displayRoles(){
    fetch("http://localhost:3007/api/getRoles")
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
    })
    .then((data) => {
    // Handle the data here, e.g., display it on the page or manipulate it as needed.
    console.table(data);
    })
    .catch((error) => {
    // Handle any errors that occurred during the fetch request.
    console.error('Error fetching notes:', error);
});



}



function displayEmployees(){
    fetch("http://localhost:3007/api/getEmplyees")
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
    })
    .then((data) => {
    // Handle the data here, e.g., display it on the page or manipulate it as needed.
    console.table(data);
    })
    .catch((error) => {
    // Handle any errors that occurred during the fetch request.
    console.error('Error fetching notes:', error);
});
}




function addRole() {

    inquirer
    .prompt ([
        {
            type: "input", 
            name: "roleName",
            message: "What is the name of the role?", 
        },
        {
            type: "input", 
            name: "salary",
            message: "What is the salary of the role?", 
        },
        {
            type: "input", 
            name: "department_id",
            message: "Which department does the role belong to?", 
        }

    ])
        .then((answers) => {
            const newRole =
            { title: answers.roleName,
            salary: answers.salary,
            department_id:answers.department_id,

        };

        fetch("http://localhost:3007/api/addRole", {
        
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRole),
        })

        .then ((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log(`HTTP error: ${response.status}`);
            }
        })

        .then ((data) => {
            console.table(data);
        })
        .catch ((error) => {
            console.error('Error fetching notes:', error);
        });
});

}

function addEmployee() {

    inquirer
    .prompt ([
        {
            type: "input", 
            name: "first_name",
            message: "What is the first name?", 
        },
        {
            type: "input", 
            name: "last_name",
            message: "What is the last name?", 
        },
        {
            type: "input", 
            name: "role_id",
            message: "What is the role id?", 
        },
        {
            type: "input", 
            name: "manager_id",
            message: "What is the manager id?", 
        },

    ])
        .then((answers) => {
            const newEmployee =
            { first_name: answers.first_name,
            last_name: answers.last_name,
            role_id:answers.role_id,
            manager_id:answers.manager_id ,

        };

        fetch("http://localhost:3007/api/addEmployee", {
        
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
        })

        .then ((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log(`HTTP error: ${response.status}`);
            }
        })

        .then ((data) => {
            console.table(data);
        })
        .catch ((error) => {
            console.error('Error fetching notes:', error);
        });
});

}


app.listen(PORT , () => {
    console.log("server is running on port{PORT}");
});

