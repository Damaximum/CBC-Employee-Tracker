const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('../config/connection');

const viewEmployees = (init) => {
    
    const viewAllEmployees = () => {
        connection.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, CONCAT (managers.first_name, " ", managers.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.dept_id = departments.id
        LEFT JOIN employees managers ON managers.id = employees.manager_id
        `, (err, res) => {
        let employeeDisplay = [];
        res.forEach((employee) => {
            employeeDisplay.push(
                {
                    'id': employee.id,
                    'first_name': employee.first_name,
                    'last_name': employee.last_name,
                    'title': employee.title,
                    'department': employee.department,
                    'salary' : employee.salary,
                    'manager': employee.manager
                }
            );
        });
        console.table('All Employees', employeeDisplay);
        // connection.end();
        viewEmployees(init);
        });
    };
    
const viewByRole = () => {
    connection.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, managers.first_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.dept_id = departments.id
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    ORDER BY roles.id ASC
`, (err, res) => {
    let employeeDisplay = [];
    res.forEach((employee) => {
        employeeDisplay.push(
            {
                'title': employee.title,
                'id': employee.id,
                'first_name': employee.first_name,
                'last_name': employee.last_name,
                'department': employee.department,
                'salary' : employee.salary,
                'manager': employee.manager
            }
        );
    });
    console.table('Employees by Role', employeeDisplay);
    // connection.end();
    viewEmployees(init);
})
};

const viewByManager = () => {
    connection.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, managers.first_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.dept_id = departments.id
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    ORDER BY managers.last_name ASC
`, (err, res) => {
    let employeeDisplay = [];
    res.forEach((employee) => {
        employeeDisplay.push(
            {
                'manager': employee.manager,
                'id': employee.id,
                'first_name': employee.first_name,
                'last_name': employee.last_name,
                'title': employee.title,
                'department': employee.department,
                'salary' : employee.salary,
            }
        );
    });
    console.table('Employees by Manager', employeeDisplay);
    // connection.end();
    viewEmployees(init);
})
};

const viewByDepartment = () => {
    connection.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, managers.first_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.dept_id = departments.id
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    ORDER BY departments.id ASC
`, (err, res) => {
    let employeeDisplay = [];
    res.forEach((employee) => {
        employeeDisplay.push(
            {
                'department': employee.department,
                'id': employee.id,
                'first_name': employee.first_name,
                'last_name': employee.last_name,
                'title': employee.title,
                'salary' : employee.salary,
                'manager': employee.manager
            }
        );
    });
    console.table('Employees by Department', employeeDisplay);
    // connection.end();
    viewEmployees(init);
})
};

const viewRoleandDept = () => {
    inquirer.prompt([
        {
            name: 'roleOrDept',
            message: 'Which would you like to view?',
            type: 'list',
            choices: [
                'Roles',
                'Departments',
                'Back'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.roleOrDept) {
            case 'Roles':
                connection.query(`
                SELECT id, title, salary, dept_id FROM roles
                `, (err, res) => {
                    let roleDisplay = [];
                    res.forEach((role) => {
                        roleDisplay.push(
                            {
                            'id': role.id,
                            'name': role.title,
                            'salary': role.salary,
                            'department_id': role.dept_id
                            }
                        );
                    });
                    console.table('All Roles', roleDisplay);
                    // connection.end();
                    viewRoleandDept();
                });
                break;
            case 'Departments':
                connection.query(`
                SELECT id, dept_name FROM departments
                `, (err, res) => {
                    let deptDisplay = [];
                    res.forEach((department) => {
                        deptDisplay.push(
                            {
                            'id': department.id,
                            'name': department.dept_name
                            }
                        );
                    });
                    console.table('All Departments', deptDisplay);
                    // connection.end();
                    viewRoleandDept();
                });
            
                break;
            case 'Back':
                viewEmployees(init);
                break;

        }
    })
};

    inquirer.prompt([
        {
            name: 'viewMenu',
            type: 'list',
            message: 'How would you like to view the employees?',
            choices: [
                'View All Employees', 
                'View Employees by Role', 
                'View Employees by Manager', 
                'View Employees by Department', 
                'View All Roles and Departments',
                'Back'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.viewMenu) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View Employees by Role':
                viewByRole(init);
                break;
            case 'View Employees by Manager':
                viewByManager(init);
                break;
            case 'View Employees by Department':
                viewByDepartment(init);
                break;
            case 'View All Roles and Departments':
                viewRoleandDept(init);
                break;
            case 'Back':
                init();
                break;
        }
    });
};


// const viewAllEmployees = (init) => {
//     connection.query(`
//     SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, CONCAT (managers.first_name, " ", managers.last_name) AS manager
//     FROM employees
//     LEFT JOIN roles ON employees.role_id = roles.id
//     LEFT JOIN departments ON roles.dept_id = departments.id
//     LEFT JOIN employees managers ON managers.id = employees.manager_id
//     `, (err, res) => {
//     let employeeDisplay = [];
//     res.forEach((employee) => {
//         employeeDisplay.push(
//             {
//                 'id': employee.id,
//                 'first_name': employee.first_name,
//                 'last_name': employee.last_name,
//                 'title': employee.title,
//                 'department': employee.department,
//                 'salary' : employee.salary,
//                 'manager': employee.manager
//             }
//         );
//     });
//     console.table('All Employees', employeeDisplay);
//     // connection.end();
//     viewEmployees(init);
//     });
// };

// const viewByRole = (init) => {
//     connection.query(`
//     SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, managers.first_name
//     FROM employees
//     LEFT JOIN roles ON employees.role_id = roles.id
//     LEFT JOIN departments ON roles.dept_id = departments.id
//     LEFT JOIN employees managers ON managers.id = employees.manager_id
//     ORDER BY roles.id ASC
// `, (err, res) => {
//     let employeeDisplay = [];
//     res.forEach((employee) => {
//         employeeDisplay.push(
//             {
//                 'title': employee.title,
//                 'id': employee.id,
//                 'first_name': employee.first_name,
//                 'last_name': employee.last_name,
//                 'department': employee.department,
//                 'salary' : employee.salary,
//                 'manager': employee.manager
//             }
//         );
//     });
//     console.table('Employees by Role', employeeDisplay);
//     // connection.end();
//     viewEmployees(init);
// })
// };

// const viewByManager = (init) => {
//     connection.query(`
//     SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, managers.first_name
//     FROM employees
//     LEFT JOIN roles ON employees.role_id = roles.id
//     LEFT JOIN departments ON roles.dept_id = departments.id
//     LEFT JOIN employees managers ON managers.id = employees.manager_id
//     ORDER BY managers.last_name ASC
// `, (err, res) => {
//     let employeeDisplay = [];
//     res.forEach((employee) => {
//         employeeDisplay.push(
//             {
//                 'manager': employee.manager,
//                 'id': employee.id,
//                 'first_name': employee.first_name,
//                 'last_name': employee.last_name,
//                 'title': employee.title,
//                 'department': employee.department,
//                 'salary' : employee.salary,
//             }
//         );
//     });
//     console.table('Employees by Manager', employeeDisplay);
//     // connection.end();
//     viewEmployees(init);
// })
// };

// const viewByDepartment = (init) => {
//     connection.query(`
//     SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, managers.first_name
//     FROM employees
//     LEFT JOIN roles ON employees.role_id = roles.id
//     LEFT JOIN departments ON roles.dept_id = departments.id
//     LEFT JOIN employees managers ON managers.id = employees.manager_id
//     ORDER BY departments.id ASC
// `, (err, res) => {
//     let employeeDisplay = [];
//     res.forEach((employee) => {
//         employeeDisplay.push(
//             {
//                 'department': employee.department,
//                 'id': employee.id,
//                 'first_name': employee.first_name,
//                 'last_name': employee.last_name,
//                 'title': employee.title,
//                 'salary' : employee.salary,
//                 'manager': employee.manager
//             }
//         );
//     });
//     console.table('Employees by Department', employeeDisplay);
//     // connection.end();
//     viewEmployees(init);
// })
// };

// const viewRoleandDept = (init) => {
//     inquirer.prompt([
//         {
//             name: 'roleOrDept',
//             message: 'Which would you like to view?',
//             type: 'list',
//             choices: [
//                 'Roles',
//                 'Departments',
//                 'Back'
//             ]
//         }
//     ])
//     .then((answer) => {
//         switch (answer.roleOrDept) {
//             case 'Roles':
//                 connection.query(`
//                 SELECT id, title, salary, dept_id FROM roles
//                 `, (err, res) => {
//                     let roleDisplay = [];
//                     res.forEach((role) => {
//                         roleDisplay.push(
//                             {
//                             'id': role.id,
//                             'name': role.title,
//                             'salary': role.salary,
//                             'department_id': role.dept_id
//                             }
//                         );
//                     });
//                     console.table('All Roles', roleDisplay);
//                     // connection.end();
//                     viewRoleandDept(init);
//                 });
//                 break;
//             case 'Departments':
//                 connection.query(`
//                 SELECT id, dept_name FROM departments
//                 `, (err, res) => {
//                     let deptDisplay = [];
//                     res.forEach((department) => {
//                         deptDisplay.push(
//                             {
//                             'id': department.id,
//                             'name': department.dept_name
//                             }
//                         );
//                     });
//                     console.table('All Departments', deptDisplay);
//                     // connection.end();
//                     viewRoleandDept(init);
//                 });
            
//                 break;
//             case 'Back':
//                 viewEmployees(init);
//                 break;

//         }
//     })
// };

module.exports = viewEmployees;