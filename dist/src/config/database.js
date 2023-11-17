"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
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
            useUTC: true, // for reading
        },
        seederStorage: 'sequelize',
        timeZone: 'UTC'
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
            useUTC: true, // for reading
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mariadb-ca-main.crt')
            // }
        },
        seederStorage: 'sequelize',
        timeZone: 'UTC'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uZmlnL2RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXVCO0FBQ3ZCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsV0FBVyxFQUFFO1FBQ1QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztRQUNqQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1FBQ2pDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU87UUFDN0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztRQUN6QixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO1FBQ3pCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGNBQWMsRUFBRTtZQUNaLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsTUFBTSxFQUFDLElBQUksRUFBQyxjQUFjO1NBQzdCO1FBQ0QsYUFBYSxFQUFFLFdBQVc7UUFDMUIsUUFBUSxFQUFDLEtBQUs7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO1FBQ3BDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7UUFDcEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtRQUNoQyxJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGNBQWMsRUFBRTtZQUNaLGdCQUFnQixFQUFFLElBQUk7U0FDekI7UUFDRCxhQUFhLEVBQUUsV0FBVztLQUM3QjtJQUNELFVBQVUsRUFBRTtRQUNSLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7UUFDakMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztRQUNqQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO1FBQzdCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU87UUFDekIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztRQUN6QixPQUFPLEVBQUUsT0FBTztRQUNoQixjQUFjLEVBQUU7WUFDWixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLE1BQU0sRUFBQyxJQUFJLEVBQUMsY0FBYztZQUMxQixTQUFTO1lBQ1QsOERBQThEO1lBQzlELElBQUk7U0FDUDtRQUNELGFBQWEsRUFBRSxXQUFXO1FBQzFCLFFBQVEsRUFBQyxLQUFLO0tBQ2pCO0NBQ0osQ0FBQyJ9