"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const helper_1 = require("../../helpers/helper");
const enum_1 = require("../../constants/enum");
const sequelize_2 = __importDefault(require("sequelize"));
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("loan_takers", {
            id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            phone_number: {
                type: sequelize_1.DataTypes.STRING(15),
                allowNull: false,
            },
            cnic: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING(100),
            },
            loan_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            paid_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true,
            },
            remaining_amount: {
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
        return queryInterface.dropTable("loan_takers");
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMzA3MjUwNjUzMTUtYWRkLWxvYW4tdGFrZXItdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIzMDcyNTA2NTMxNS1hZGQtbG9hbi10YWtlci10YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFrRTtBQUNsRSxpREFBZ0Q7QUFDaEQsK0NBQWtEO0FBQ2xELDBEQUFrQztBQUVsQyxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsRUFBRSxFQUFFLENBQUMsY0FBOEIsRUFBRSxFQUFFO1FBQ3JDLE9BQU8sY0FBYyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDL0MsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUMvQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsYUFBYSxFQUFFLElBQUk7YUFDcEI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUM1QjtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO2dCQUN2QixZQUFZLEVBQUUsQ0FBQztnQkFDZixTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO2dCQUN2QixZQUFZLEVBQUUsQ0FBQztnQkFDZixTQUFTLEVBQUUsSUFBSTthQUNoQjtZQUNELGdCQUFnQixFQUFFO2dCQUNoQixJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO2dCQUN2QixZQUFZLEVBQUUsQ0FBQztnQkFDZixTQUFTLEVBQUUsSUFBSTthQUNoQjtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUscUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFBLGlCQUFRLEVBQUMsaUJBQVUsQ0FBQyxDQUFDO2dCQUM3QyxZQUFZLEVBQUUsaUJBQVUsQ0FBQyxNQUFNO2FBQ2hDO1lBRUQsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxXQUFXO2dCQUNqQixZQUFZLEVBQUUsbUJBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3BELFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxXQUFXO2dCQUNqQixZQUFZLEVBQUUsbUJBQVMsQ0FBQyxPQUFPLENBQzdCLCtDQUErQyxDQUNoRDtnQkFDRCxTQUFTLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxjQUE4QixFQUFFLEVBQUU7UUFDdkMsT0FBTyxjQUFjLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRixDQUFDIn0=