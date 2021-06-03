// const mysql = require('mysql');
// const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('../config/connection');

const editEmployees = (init) => {
    inquirer.prompt([
        {
            name: 'editEmpMenu',
            type: 'list',
            message: 'What would you like to edit?',
            choices: [
                'Add new Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Update Employee Department',
                'Back'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.editEmpMenu) {
            case 'Add new Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
            
                break;
            case 'Update Employee Manager':
                init();
                break;
            case 'Update Employee Department':
                init();
                break;
            case 'Back':
                init();
                break;
        }
    })

    function addEmployee(roles, employees) {

        let roleTitles = [];

        function buildRole() {
            roles.forEach((role) => {
                roleTitles.push(role.title);
            });
        };
        buildRole();

        let managerList = ['None'];

        function buildManagers() {
            employees.forEach(())
        }

        inquirer.prompt([
            {
                name: 'empFirstName',
                type: 'input',
                message: `What is the employee's first name?`,
            },
            {
                name: 'empLastName',
                type: 'input',
                message: `What is the employee's last name?`,
            },
            {
                name: 'empRole',
                type: 'list',
                message: `What is the employee's role?`,
                choices: roleTitles,
            },
            {
                name: 'empManager',
                type: 'list',
                message: `What is the employee's manager, if any?`,
                choices: managerList,
            },
        ])
        .then((answers) => {
            
        })
    }
};

module.exports = editEmployees;