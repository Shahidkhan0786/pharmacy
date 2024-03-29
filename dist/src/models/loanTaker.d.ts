import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { StatusEnum } from "../constants/enum";
export declare class LoanTaker extends Model<InferAttributes<LoanTaker>, InferCreationAttributes<LoanTaker>> {
    id: number | null;
    name: string;
    phone_number: string;
    cnic: string;
    description: string;
    loan_amount?: number;
    remaining_amount?: number;
    paid_amount?: number;
    status: StatusEnum;
    createdAt?: Date;
    updatedAt?: Date;
}
