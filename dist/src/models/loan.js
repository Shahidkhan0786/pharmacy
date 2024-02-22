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
    return_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    loan_type: {
        type: sequelize_1.DataTypes.ENUM("cash", "items"),
        allowNull: false,
        defaultValue: "cash",
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    installment_amount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    installment_count: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    bill_no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
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
// Loan.belongsTo(LoanTaker, {
//   foreignKey: "loan_taker_id",
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvbG9hbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FPbUI7QUFDbkIscURBQWlEO0FBQ2pELDRDQUErQztBQUMvQyw4Q0FBNkM7QUFFN0MsTUFBYSxJQUFLLFNBQVEsaUJBR3pCO0NBY0E7QUFqQkQsb0JBaUJDO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUDtJQUNFLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1FBQy9CLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLFFBQVE7UUFDL0IsU0FBUyxFQUFFLEtBQUs7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUscUJBQVMsQ0FBQyxRQUFRO1FBQ3hCLFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLHFCQUFTLENBQUMsUUFBUTtRQUN4QixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxxQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1FBQ3JDLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxNQUFNO0tBQ3JCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztRQUN2QixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsWUFBWSxFQUFFLENBQUM7UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsWUFBWSxFQUFFLENBQUM7UUFDZixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsU0FBUyxFQUFFLElBQUk7S0FDaEI7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQzVCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLHFCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBQSxpQkFBUSxFQUFDLGlCQUFVLENBQUMsQ0FBQztRQUM3QyxZQUFZLEVBQUUsaUJBQVUsQ0FBQyxNQUFNO0tBQ2hDO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFdBQVc7UUFDakIsWUFBWSxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ3BELFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFdBQVc7UUFDakIsWUFBWSxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUM3QiwrQ0FBK0MsQ0FDaEQ7UUFDRCxTQUFTLEVBQUUsS0FBSztLQUNqQjtDQUNGLEVBQ0Q7SUFDRSxTQUFTLEVBQVQsc0JBQVM7SUFDVCxVQUFVLEVBQUUsS0FBSztJQUNqQixTQUFTLEVBQUUsT0FBTztDQUNuQixDQUNGLENBQUM7QUFFRiw4QkFBOEI7QUFDOUIsaUNBQWlDO0FBQ2pDLE1BQU0ifQ==