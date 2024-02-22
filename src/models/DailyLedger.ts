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
export class DailyLedger extends Model<
  InferAttributes<DailyLedger>,
  InferCreationAttributes<DailyLedger>
> {
  id: number | null;
  //   distributor_id: number;
  ledger_date: Date;
  rs_ten: number;
  rs_twenty: number;
  rs_fifty: number;
  rs_hundred: number;
  rs_5hundred: number;
  rs_thousand: number;
  rs_5thousand: number;
  coins: number;
  rs_total: number;
  jazz_cash: number;
  easy_pasa: number;
  bank: number;
  accounts_total: number;
  grand_total: number;
  description: string;
  // status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

DailyLedger.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    ledger_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    rs_ten: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    rs_twenty: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    rs_fifty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    rs_hundred: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rs_5hundred: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rs_thousand: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rs_5thousand: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rs_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jazz_cash: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    easy_pasa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accounts_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grand_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // status: {
    //   type: DataTypes.ENUM(...enumKeys(StatusEnum)),
    //   defaultValue: StatusEnum.Active,
    // },
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
    tableName: "daily_ledger",
  }
);

// LoanTaker.belongsTo(Loan, { foreignKey: 'loan_taker_id' });
