import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  Sequelize,
} from "sequelize";
import { sequelize } from "../config/connection";
import { StatusEnum, PaymentSourceEnum } from "../constants/enum";
import { enumKeys } from "../helpers/helper";
import { Loan } from "./loan";
export class DailyClosing extends Model<
  InferAttributes<DailyClosing>,
  InferCreationAttributes<DailyClosing>
> {
  id: number | null;
  //   distributor_id: number;
  closing_date: Date;
  total_sales: number;
  previous_day_closing_sale: number;
  loan: number;
  loan_return: number;
  debited_amount: number;
  credited_amount: number;
  grand_total: number;
  //   loan_id: number;
  description: string;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

DailyClosing.init(
  {
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
    description: {
      type: DataTypes.STRING(100),
    },
    previous_day_closing_sale: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
  },
  {
    sequelize,
    timestamps: false,
    tableName: "daily_closings",
  }
);

// LoanTaker.belongsTo(Loan, { foreignKey: 'loan_taker_id' });
