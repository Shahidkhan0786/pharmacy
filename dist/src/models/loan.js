"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/connection");
const enum_1 = require("../constants/enum");
const helper_1 = require("../helpers/helper");
class Loan extends sequelize_1.Model {
}
exports.Loan = Loan;
Loan.init({
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
    tableName: "loans",
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvbG9hbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FPbUI7QUFDbkIscURBQWlEO0FBQ2pELDRDQUErQztBQUMvQyw4Q0FBNkM7QUFDN0MsTUFBYSxJQUFLLFNBQVEsaUJBQTJEO0NBV3BGO0FBWEQsb0JBV0M7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNQO0lBQ0UsRUFBRSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLFFBQVE7UUFDL0IsVUFBVSxFQUFFLElBQUk7UUFDaEIsYUFBYSxFQUFFLElBQUk7S0FDcEI7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUTtRQUMvQixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxxQkFBUyxDQUFDLFFBQVE7UUFDeEIsU0FBUyxFQUFFLEtBQUs7S0FDakI7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztRQUNyQyxTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsU0FBUyxFQUFFLEtBQUs7S0FDakI7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO0tBQ3hCO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUM1QjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEsaUJBQVEsRUFBQyxpQkFBVSxDQUFDLENBQUM7UUFDN0MsWUFBWSxFQUFFLGlCQUFVLENBQUMsTUFBTTtLQUNoQztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxXQUFXO1FBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUNwRCxTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxXQUFXO1FBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FDN0IsK0NBQStDLENBQ2hEO1FBQ0QsU0FBUyxFQUFFLEtBQUs7S0FDakI7Q0FDRixFQUNEO0lBQ0UsU0FBUyxFQUFULHNCQUFTO0lBQ1QsVUFBVSxFQUFFLEtBQUs7SUFDakIsU0FBUyxFQUFFLE9BQU87Q0FDbkIsQ0FDRixDQUFDIn0=