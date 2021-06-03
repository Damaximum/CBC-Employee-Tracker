const inquirer = require('inquirer');

// view employees
const viewEmployees = require('./viewEmployees');
// edit employee
const editEmployees = require('./editEmployees');
// edit roles
const editRoles = require('./editRoles');
// edit department
const editDepartments = require('./editDepartments');


function init() {
    inquirer.prompt([
        {
            name: 'mainMenu',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees, Roles, and Departments', 
                'Edit Employees', 
                'Edit Roles', 
                'Edit Department', 
                'Exit'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.mainMenu) {
            case 'View Employees, Roles, and Departments':
                viewEmployees(init);
                break;
            case 'Edit Employees':
                editEmployees(init);
                break;
            case 'Edit Roles':
                editRoles(init);
                break;
            case 'Edit Department':
                editDepartments(init);
                break;
            case 'Exit':
                return process.exit();
                break;
        }
    })
};

module.exports = 
// () => {console.log('test');};
init;