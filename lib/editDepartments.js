const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('../config/connection');

const editDepartments = (init) => {
    inquirer.prompt([
        {
            name: 'editDeptMenu',
            type: 'list',
            message: 'What would you like to edit?',
            choices: [
                'Add new Department',
                'Update Department Name',
                'Back'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.editDeptMenu) {
            case 'Add new Department':
                
                break;
            case 'Update Department Name':
            
                break;
            case 'Back':
            
                break;
        }
    })


};

module.exports = editDepartments;