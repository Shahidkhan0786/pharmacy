"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require("dotenv/config");
const sequelize_1 = __importDefault(require("sequelize"));
exports.sequelize = new sequelize_1.default.Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    define: {
        // underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
    },
    pool: {
        acquire: 60000,
        idle: 10000,
        max: 20
    },
    dialect: "mysql",
});
// export const sequelize = new Sequelize.Sequelize(process.env.MYSQLDB_DATABASE, process.env.MYSQLDB_USER, process.env.MYSQLDB_ROOT_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWcvY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5QkFBdUI7QUFDdkIsMERBQWtDO0FBRXJCLFFBQUEsU0FBUyxHQUFHLElBQUksbUJBQVMsQ0FBQyxTQUFTLENBQUM7SUFDL0MsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztJQUN6QixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO0lBQzdCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7SUFDakMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztJQUNqQyxNQUFNLEVBQUU7UUFDSixxQkFBcUI7UUFDckIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLG9CQUFvQjtLQUNoQztJQUNELElBQUksRUFBQztRQUNELE9BQU8sRUFBQyxLQUFLO1FBQ2IsSUFBSSxFQUFDLEtBQUs7UUFDVixHQUFHLEVBQUMsRUFBRTtLQUNUO0lBQ0QsT0FBTyxFQUFFLE9BQU87Q0FDakIsQ0FBQyxDQUFDO0FBRUgsZ0pBQWdKO0FBQ2hKLHlCQUF5QjtBQUN6QiwySEFBMkg7QUFDM0gsUUFBUSJ9