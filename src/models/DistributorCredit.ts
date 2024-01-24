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
export class DistributorCredit extends Model<
  InferAttributes<DistributorCredit>,
  InferCreationAttributes<DistributorCredit>
> {
  id: number | null;
  distributor_id: number;
  //   loan_id: number;
  description: string;
  credit_date: Date;
  credit_amount: number;
  payment_source: PaymentSourceEnum;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

DistributorCredit.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    distributor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    credit_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    credit_amount: {
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
    tableName: "distributor-credits",
  }
);

// LoanTaker.belongsTo(Loan, { foreignKey: 'loan_taker_id' });
