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
    return_date?: Date;
    installment_amount?: number;
    installment_count?: number;
    status: StatusEnum;
    createdAt?: Date;
    updatedAt?: Date;
}
