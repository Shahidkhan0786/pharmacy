// import { QueryInterface, DataTypes, QueryTypes } from "sequelize";
// import Sequelize from "sequelize";

// module.exports = {
//   up: (queryInterface: QueryInterface) => {
//     return queryInterface.createTable("distributor_details", {
//       id: {
//         type: DataTypes.BIGINT.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       distributor_id: {
//         type: DataTypes.BIGINT.UNSIGNED,
//         allowNull: false,
//       },
//       bill_no: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       debit_amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       credit_amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       createdAt: {
//         type: "TIMESTAMP",
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//         allowNull: false,
//       },
//       updatedAt: {
//         type: "TIMESTAMP",
//         defaultValue: Sequelize.literal(
//           "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
//         ),
//         allowNull: false,
//       },
//     });
//   },
//   down: (queryInterface: QueryInterface) => {
//     return queryInterface.dropTable("distributor_details");
//   },
// };
