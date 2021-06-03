// const Sequelize = require('sequelize');
const mysql = require('mysql');

require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     port: 3306
//   }
// );

const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  }
  );

module.exports = connection;
