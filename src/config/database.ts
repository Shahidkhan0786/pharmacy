import 'dotenv/config';
const fs = require('fs');

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
            useUTC:true,// for reading
        },
        seederStorage: 'sequelize',
        timeZone:'UTC'
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
        seederStorage: 'sequelize'
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
            useUTC:true,// for reading
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mariadb-ca-main.crt')
            // }
        },
        seederStorage: 'sequelize',
        timeZone:'UTC'
    }
};