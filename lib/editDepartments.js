// const mysql = require('mysql');
// const cTable = require('console.table');
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
                addDept();
                break;
            case 'Update Department Name':
                init();
                break;
            case 'Back':
                init();
                break;
        }
    })

    function addDept() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'newDept',
                message: 'What is the newly added department?'
            }
        ])
        .then((answer) => {
            connection.query(`
            INSERT INTO departments (name) VALUES ('${answer.newDept}')
            `, (err, res) => {
                if (err) throw err
            });
        })

        editDepartments(init);
    }
};

module.exports = editDepartments;