// require("dotenv").config();
// import mysql from 'mysql2/promise';

// const connection = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     database: process.env.DB,
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0
// });

// export default connection;

const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connection;