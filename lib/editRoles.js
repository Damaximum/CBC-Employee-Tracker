const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('../config/connection');

const editRoles = (init) => {
    inquirer.prompt([
        {
            name: 'editRoleMenu',
            type: 'list',
            message: 'What would you like to edit?',
            choices: [
                'Add new Role',
                'Update Role',
                'Update Role Salary',
                'Update Role Department',
                'Back'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.editRoleMenu) {
            case 'Add new Role':
                
                break;
            case 'Update Role':
            
                break;
            case 'Update Role Salary':
            
                break;
            case 'Update Role Department':
            
                break;
            case 'Back':
            
                break;
        }
    })
};

module.exports = editRoles;