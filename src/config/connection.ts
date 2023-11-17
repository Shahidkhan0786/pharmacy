import 'dotenv/config';
import Sequelize from 'sequelize';

export const sequelize = new Sequelize.Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  define: {
      // underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci"
  },
  pool:{
      acquire:60000,
      idle:10000,
      max:20
  },
  dialect: "mysql",
});

// export const sequelize = new Sequelize.Sequelize(process.env.MYSQLDB_DATABASE, process.env.MYSQLDB_USER, process.env.MYSQLDB_ROOT_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });