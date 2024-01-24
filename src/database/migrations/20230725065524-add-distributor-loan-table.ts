import { QueryInterface, DataTypes, QueryTypes } from "sequelize";
import Sequelize from "sequelize";
import { StatusEnum } from "../../constants/enum";
import { enumKeys } from "../../helpers/helper";
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("distributor_loans", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      loan_taker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      loan_type: {
        type: DataTypes.ENUM("cash", "items"),
        allowNull: false,
        defaultValue: "cash",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      installment_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      installment_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      bill_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(100),
      },
      status: {
        type: DataTypes.ENUM(...enumKeys(StatusEnum)),
        defaultValue: StatusEnum.Active,
      },
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
    return queryInterface.dropTable("distributor_loans");
  },
};
