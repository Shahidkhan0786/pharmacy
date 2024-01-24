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
export class DistributorDebit extends Model<
  InferAttributes<DistributorDebit>,
  InferCreationAttributes<DistributorDebit>
> {
  id: number | null;
  distributor_id: number;
  description: string;
  amount: number;
  bill_no: number;
  date?: Date;
  installment_amount?: number;
  installment_count?: number;
  payment_source: PaymentSourceEnum;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

DistributorDebit.init(
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
    tableName: "distributor-debits",
  }
);
