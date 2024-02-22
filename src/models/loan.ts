import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  Sequelize,
} from "sequelize";
import { sequelize } from "../config/connection";
import { StatusEnum } from "../constants/enum";
import { enumKeys } from "../helpers/helper";
import { LoanTaker } from "./loanTaker";
export class Loan extends Model<
  InferAttributes<Loan>,
  InferCreationAttributes<Loan>
> {
  id: number | null;
  loan_taker_id: number;
  loan_type: string;
  description: string;
  amount: number;
  bill_no: number;
  date?: Date;
  return_date?: Date;
  installment_amount?: number;
  installment_count?: number;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

Loan.init(
  {
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
  },
  {
    sequelize,
    timestamps: false,
    tableName: "loans",
  }
);

// Loan.belongsTo(LoanTaker, {
//   foreignKey: "loan_taker_id",
// });
