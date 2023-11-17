import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { StatusEnum } from "../constants/enum";
export declare class Loan extends Model<InferAttributes<Loan>, InferCreationAttributes<Loan>> {
    id: number | null;
    loan_taker_id: number;
    loan_type: string;
    description: string;
    amount: number;
    bill_no: number;
    date?: Date;
    status: StatusEnum;
    createdAt?: Date;
    updatedAt?: Date;
}
