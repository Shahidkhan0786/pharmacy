import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    id: number | null;
    userId: number;
    phoneno: string;
    createdAt?: Date;
    updatedAt?: Date;
}
