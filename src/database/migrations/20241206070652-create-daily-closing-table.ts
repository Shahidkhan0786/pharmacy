import { QueryInterface, DataTypes, QueryTypes } from "sequelize";
import Sequelize from "sequelize";
import { StatusEnum, PaymentSourceEnum } from "../../constants/enum";
import { enumKeys } from "../../helpers/helper";
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("daily_closings", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      closing_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_sales: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // total_payments: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // total_expenses: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      previous_day_closing_sale: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_loan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_loan_return: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Add other fields as needed
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull: false,
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("daily_closings");
  },
};
