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
        return queryInterface.createTable("distributors", {
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
        return queryInterface.dropTable("distributors");
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMzA3MjUwNjQ3MzgtYWRkLWRpc3RyaWJ1dG9yLXRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGFiYXNlL21pZ3JhdGlvbnMvMjAyMzA3MjUwNjQ3MzgtYWRkLWRpc3RyaWJ1dG9yLXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQWtFO0FBQ2xFLGlEQUFnRDtBQUNoRCwrQ0FBa0Q7QUFDbEQsMERBQWtDO0FBRWxDLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixFQUFFLEVBQUUsQ0FBQyxjQUE4QixFQUFFLEVBQUU7UUFDckMsT0FBTyxjQUFjLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRTtZQUNoRCxFQUFFLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQy9CLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixhQUFhLEVBQUUsSUFBSTthQUNwQjtZQUNELElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUMxQixTQUFTLEVBQUUsS0FBSzthQUNqQjtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQzVCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzFCLFNBQVMsRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzFCLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEsaUJBQVEsRUFBQyxpQkFBVSxDQUFDLENBQUM7Z0JBQzdDLFlBQVksRUFBRSxpQkFBVSxDQUFDLE1BQU07YUFDaEM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztnQkFDcEQsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxtQkFBUyxDQUFDLE9BQU8sQ0FDN0IsK0NBQStDLENBQ2hEO2dCQUNELFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLGNBQThCLEVBQUUsRUFBRTtRQUN2QyxPQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNGLENBQUMifQ==