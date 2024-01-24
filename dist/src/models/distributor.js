"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Distributor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/connection");
const enum_1 = require("../constants/enum");
const helper_1 = require("../helpers/helper");
class Distributor extends sequelize_1.Model {
}
exports.Distributor = Distributor;
Distributor.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    phoneNo: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    loan_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    remaining_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    paid_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...(0, helper_1.enumKeys)(enum_1.StatusEnum)),
        defaultValue: enum_1.StatusEnum.Active,
    },
    createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updatedAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        allowNull: false,
    },
}, {
    sequelize: connection_1.sequelize,
    timestamps: false,
    tableName: "distributors",
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdHJpYnV0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL2Rpc3RyaWJ1dG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQU9tQjtBQUNuQixxREFBaUQ7QUFDakQsNENBQStDO0FBQy9DLDhDQUE2QztBQUM3QyxNQUFhLFdBQVksU0FBUSxpQkFHaEM7Q0FZQTtBQWZELGtDQWVDO0FBRUQsV0FBVyxDQUFDLElBQUksQ0FDZDtJQUNFLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1FBQy9CLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMxQixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDNUI7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzFCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMxQixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsWUFBWSxFQUFFLENBQUM7UUFDZixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsWUFBWSxFQUFFLENBQUM7UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsWUFBWSxFQUFFLENBQUM7UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEsaUJBQVEsRUFBQyxpQkFBVSxDQUFDLENBQUM7UUFDN0MsWUFBWSxFQUFFLGlCQUFVLENBQUMsTUFBTTtLQUNoQztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxXQUFXO1FBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUNwRCxTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxXQUFXO1FBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FDN0IsK0NBQStDLENBQ2hEO1FBQ0QsU0FBUyxFQUFFLEtBQUs7S0FDakI7Q0FDRixFQUNEO0lBQ0UsU0FBUyxFQUFULHNCQUFTO0lBQ1QsVUFBVSxFQUFFLEtBQUs7SUFDakIsU0FBUyxFQUFFLGNBQWM7Q0FDMUIsQ0FDRixDQUFDIn0=