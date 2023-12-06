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
export class LoanTransaction extends Model<
  InferAttributes<LoanTransaction>,
  InferCreationAttributes<LoanTransaction>
> {
  id: number | null;
  loan_taker_id: number;
  //   loan_id: number;
  description: string;
  transaction_date: Date;
  transaction_amount: number;
  payment_source: PaymentSourceEnum;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

LoanTransaction.init(
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
    // loan_id: {
    //     type: DataTypes.BIGINT.UNSIGNED,
    //     allowNull: false,
    // },
    transaction_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    transaction_amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    payment_source: {
      type: DataTypes.ENUM(...enumKeys(PaymentSourceEnum)),
      defaultValue: PaymentSourceEnum.CASH,
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
    tableName: "loan_transactions",
  }
);

// LoanTaker.belongsTo(Loan, { foreignKey: 'loan_taker_id' });
