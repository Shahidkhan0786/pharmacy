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
      loan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loan_return: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      debited_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      credited_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grand_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(100),
      },
      status: {
        type: DataTypes.ENUM(...enumKeys(StatusEnum)),
        defaultValue: StatusEnum.Active,
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
