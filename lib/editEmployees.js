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
                updateEmployee();
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

    function addEmployee() {

        connection.query(`
        SELECT id, title FROM roles
        `, (err, res) => {


            let roleTitles = [];
            let roleCheck = [];
            let managerList = ['None'];
            let managerCheck = [];
            
            res.forEach((roles) => {
                roleTitles.push(
                    roles.title
                );
                roleCheck.push(
                    {
                        'id' : roles.id,
                        'title' : roles.title
                    }
                );
            });
            connection.query(`
            SELECT first_name, last_name, id FROM employees
            `, (err, res) => {

                res.forEach((employees) => {
                    let empName = `${employees.last_name}, ${employees.first_name}`;
                    managerList.push(
                        empName
                    );
                    managerCheck.push(
                        {
                            'id': employees.id,
                            'name': empName
                        }
                    ) ;
                });

    
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
                .then((answer) => {
                    let setRole;
                    
                    for (var i = 0; i < roleCheck.length; i++) {
                        if (answer.empRole === roleCheck[i].title) {
                            setRole = roleCheck[i].id;
                        }
                    };

                    for (var i = 0; i < managerCheck.length; i++) {
                        if (answer.empManager === managerCheck[i].name) {
                            answer.empManager = managerCheck[i].id;
                        } else if (answer.empManager === 'None') {
                            answer.empManager = null;
                        }
                    };

    
                    connection.query(`
                    INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.empFirstName}', '${answer.empLastName}', ${setRole}, ${answer.empManager})
                    `, (err, res) => {
                        if (err) throw err
                        editEmployees(init);
                    })
                })
            })
        })

    }

    function updateEmployee() {
        connection.query(`
        SELECT * FROM employees
        `, (err, res) => {
            if (err) throw err;
            let empNames = [];
            let empNames2 = [];
            res.forEach((employees) => {
                let tempName = `${employees.last_name}, ${employees.first_name}`;
                empNames.push(
                    tempName
                );
                empNames2.push(
                    {
                        'id': employees.id,
                        'first_name': employees.first_name,
                        'last_name': employees.last_name
                    }
                )
            });
            connection.query(`
            SELECT title, id FROM roles
            `, (err, res) => {
                if (err) throw err;
                let roleList = [];
                let roleCheck = [];
                res.forEach((roles) => {
                    roleList.push(
                        roles.title
                    );
                    roleCheck.push(
                        {
                            'id' : roles.id,
                            'title' : roles.title
                        }
                    );
                });

                inquirer.prompt([
                    {
                        name: 'updateEmp',
                        type: 'list',
                        message: 'Who would you like to update?',
                        choices: empNames
                    },
                    {
                        name: 'updateRole',
                        type: 'list',
                        message: 'What is the new role they will be taking?',
                        choices: roleList
                    }
                ])
                .then((answer) => {
                    let setRole;
                    for (var i = 0; i < roleCheck.length; i++) {
                        if (answer.updateRole === roleCheck[i].title) {
                            setRole = roleCheck[i].id;
                        }
                    };

                    for (var i = 0; i < empNames2.length; i++) {
                        if (answer.updateEmp === `${empNames2[i].last_name}, ${empNames2[i].first_name}`) {
                            answer.updateEmp = empNames2[i].id;
                        }
                    };

                    connection.query(`
                    UPDATE employees SET role_id=? WHERE id=?
                    `, [setRole, answer.updateEmp], (err, res) => {
                        if (err) throw err;
                        editEmployees(init);
                    })
                })
            });

        });
    };
};

module.exports = editEmployees;