"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const enum_1 = require("../../constants/enum");
const helper_1 = require("../../helpers/helper");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("loans", {
            id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            loan_taker_id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
            },
            date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
            },
            loan_type: {
                type: sequelize_1.DataTypes.ENUM("cash", "items"),
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            bill_no: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            description: {
                type: sequelize_1.DataTypes.STRING(100),
            },
            status: {
                type: sequelize_1.DataTypes.ENUM(...(0, helper_1.enumKeys)(enum_1.StatusEnum)),
                defaultValue: enum_1.StatusEnum.Active,
            },
            createdAt: {
                type: "TIMESTAMP",
                defaultValue: sequelize_2.default.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updatedAt: {
                type: "TIMESTAMP",
                defaultValue: sequelize_2.default.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("loans");
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMzA3MjUwNjU1MjQtYWRkLWxvYW4tdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIzMDcyNTA2NTUyNC1hZGQtbG9hbi10YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFrRTtBQUNsRSwwREFBa0M7QUFDbEMsK0NBQWtEO0FBQ2xELGlEQUFnRDtBQUNoRCxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsRUFBRSxFQUFFLENBQUMsY0FBOEIsRUFBRSxFQUFFO1FBQ3JDLE9BQU8sY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDekMsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUMvQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsYUFBYSxFQUFFLElBQUk7YUFDcEI7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQy9CLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxxQkFBUyxDQUFDLFFBQVE7Z0JBQ3hCLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxxQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUNyQyxTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO2dCQUN2QixTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO2FBQ3hCO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDNUI7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLHFCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBQSxpQkFBUSxFQUFDLGlCQUFVLENBQUMsQ0FBQztnQkFDN0MsWUFBWSxFQUFFLGlCQUFVLENBQUMsTUFBTTthQUNoQztZQUNELFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsV0FBVztnQkFDakIsWUFBWSxFQUFFLG1CQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO2dCQUNwRCxTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsV0FBVztnQkFDakIsWUFBWSxFQUFFLG1CQUFTLENBQUMsT0FBTyxDQUM3QiwrQ0FBK0MsQ0FDaEQ7Z0JBQ0QsU0FBUyxFQUFFLEtBQUs7YUFDakI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsY0FBOEIsRUFBRSxFQUFFO1FBQ3ZDLE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0YsQ0FBQyJ9