import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { UserTypeEnum } from "../constants/enum";
export declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    role: UserTypeEnum;
    password: string;
    ForgotpasswordToken: string;
    ForgotpasswordExpires: Date | number;
    createdAt?: Date;
    updatedAt?: Date;
    getFullname(): string;
    validPassword(password: any): boolean;
    getJwtToken(): string;
    getForgotpasswordToken(): string;
}
