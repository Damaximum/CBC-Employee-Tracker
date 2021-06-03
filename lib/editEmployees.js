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

        connection.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, managers.first_name
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN employees managers ON managers.id = employees.manager_id
        `, (err, res) => {


            let roleTitles = [];
            let managerList = ['None'];
    
    
    
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
        })

    }
};

module.exports = editEmployees;