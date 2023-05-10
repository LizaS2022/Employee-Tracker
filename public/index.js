const inquirer = require('inquirer');
// const fs = require('fs');
const express = require('express');
const { Console } = require('console');

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
            choices: ["View All Employees","Add Employee", "View All Roles", "Add Role", "View All Departments","Update Employee Role", "Quit"]
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
                console.log(viewDepartments);
                break;

            case "Update Employee Role":
                console.log("got to update employee role case");
                updateEmployeeRole();
                break;

            case "Quit":
                console.log("application ended");
                return "Goodbye!";
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
    console.table(data);
    userPrompt();
    
    })
    .catch((error) => {
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
    userPrompt();
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
    console.log("Successfully added employee");
    userPrompt();
    })
    .catch((error) => {
    // Handle any errors that occurred during the fetch request.
    console.error('Error fetching notes:', error);
});
}




function addRole() {

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
    // console.log(data);
        const departmentList = data.map((department)=> {
            return {
                name:department.name,
                value: department.id,
            }
        }  
        )

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
            type: "list", 
            name: "department_id",
            message: "Which department does the role belong to?", 
            choices: departmentList, 
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
            console.log("Successfuly added role");
            userPrompt();
        })
        .catch ((error) => {
            console.error('Error fetching notes:', error);
        });
});



    })
    .catch((error) => {
    // Handle any errors that occurred during the fetch request.
    console.error('Error fetching notes:', error);
});
}

function addEmployee() {

    fetch("http://localhost:3007/api/getRoles")
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
    })
    .then((data) => {
        // console.log(data);
        const employeeRoleIdList = data.map((role)=> {
            return {
                name:role.title,
                value: role.id,
            }
        }  
        )
       
     fetch("http://localhost:3007/api/addEmployee",  {
        
     method: "POST",
     headers: {
         "Content-Type": "application/json",
     },
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
        // console.log(data);
        const employeeManagerIdName = data.map((employee) => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
            }})
            employeeManagerIdName.push({name:"none", value: null} )

    
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
            type: "list", 
            name: "role_id",
            message: "what is the the title?", 
            choices: employeeRoleIdList,
        },

        {
            type: "list", 
            name: "manager_id",
            message: "What is the manager name?",
            choices: employeeManagerIdName,
        }
      

    ])

        .then((answers) => {
            const newEmployee =
            { first_name: answers.first_name,
            last_name: answers.last_name,
            role_id:answers.role_id,
            manager_id:answers.manager_id,

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
            userPrompt();
        })
    })
})
        .catch ((error) => {
            console.error('Error fetching notes:', error);
        })
});
}


function updateEmployeeRole(){
    fetch("http://localhost:3007/api/getEmplyees")
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
    })
    .then((data) => {
        // console.log(data);
        const employeeNameIdList = data.map((employee)=> {
            return {
                name:employee.first_name +" "+ employee.last_name,
                value: employee.id,
            }
        }  
        )
       

        fetch("http://localhost:3007/api/getroles")
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
    })
    .then((data) => {
        // console.log(data);
        const employeeSelectedRole = data.map((role)=> {
            return {
                name:role.title,
                value: role.id,
            }
        }  
        )

    // Handle the data here, e.g., display it on the page or manipulate it as needed.
    
    inquirer
    .prompt ([
        {
            type: "list", 
            name: "employeeName",
            message: "Which employee's role you want to update?", 
            choices: employeeNameIdList,
        },

        {
            type: "list", 
            name: "role_id",
            message: "Which role would you like to assign to the selected employee?", 
            choices: employeeSelectedRole,
        },

    ])

        .then((answers) => {
            
            const updateEmployee =
            { 
           role_id: answers.role_id,
           id: answers.employeeName,
        };

        fetch("http://localhost:3007/api/employee/${answers.employeeName}", {
            
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateEmployee),
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
            userPrompt();
        })
    })
})
    })
        .catch ((error) => {
            console.error('Error fetching notes:', error);
        })
};



app.listen(PORT , () => {
    console.log("server is running on port{PORT}");
})

