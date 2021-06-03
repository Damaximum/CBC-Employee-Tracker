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

    function addRole() {
        
        connection.query(`
        SELECT departments.id, departments.dept_name FROM departments
        `, (err, res) => {
            if (err) throw err;
            let deptIds = [];
            let deptList = [];
            res.forEach((departments) => {
                deptList.push(
                        departments.dept_name,
                );
                deptIds.push(
                    {
                        'id': departments.id,
                        'dept_name': departments.dept_name,
                    }
                );
                
            });
            
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
                
                for (var i = 0; i < deptIds.length; i++) {
                    if (answer.roleDept === deptIds[i].dept_name) {
                        setDept = deptIds[i].id;
                    };
                };

                connection.query(`
                INSERT INTO roles (title, salary, dept_id) VALUES ('${answer.newRole}', ${answer.roleSalary}, ${setDept})
                `, (err, res) => {
                    if (err) throw err
                });
                editRoles(init);
            });
        });
        
    };
};

module.exports = editRoles;