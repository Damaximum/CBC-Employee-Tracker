INSERT INTO department
  (dept_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Interns');

INSERT INTO role
  (title, salary, dept_id)
VALUES
  ('Sales Lead', 60000 , 1),
  ('Salesperson', 50000 , 1),
  ('Lead Engineer', 100000, 2),
  ('Software Enginner', 80000, 2),
  ('Accountant', 100000, 3),
  ('Intern Team Lead', 125000, 4),
  ('Intern', 100000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Jane', 'Doe', 1, NULL),
  ('Billy', 'Bob', 2, 1),
  ('John', 'Doh', 3, NULL),
  ('Johnny', 'Test', 4, 3),
  ('Ginny', 'Kim', 5, NULL),
  ('Jane', 'Park', 6, NULL),
  ('Alex', 'Pram', 7, 6);