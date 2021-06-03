// const mysql = require('mysql');
// const cTable = require('console.table');
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
                addRole();
                break;
            case 'Update Role':
                init();
                break;
            case 'Update Role Salary':
                init();
                break;
            case 'Update Role Department':
                init();
                break;
            case 'Back':
                init();
                break;
        }
    })

    function addRole(departments) {

        let deptList = [];

        function buildDepts() {
            departments.forEach((departments) => {
                deptList.push(departments.dept_name);
            });
        };
        buildDepts();

        inquirer.prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the new role you would like to add?',
            },
            {
                name: 'roleSalary',
                type: 'number',
                message: 'What is the salary of the role?',
            },
            {
                name: 'roleDept',
                type: 'list',
                message: 'What department does the role belong to?',
                choices: deptList,
            }
        ])
        .then ((answer) => {
            let setDept;
            function deptIdSearch(selDept, departments) {
                for (var i = 0; i < departments; i++) {
                    if (selDept === departments[i]) {
                        setDept = departments[i].id;
                    }
                }
            }
            deptIdSearch(answer.roleDept, departments);

            connection.query(`
            INSERT INTO roles VALUES ('${answer.newRole}', ${answer.roleSalary}, ${setDept})
            `, (err, res) => {
                if (err) throw err
            });
        });
    }
};

module.exports = editRoles;