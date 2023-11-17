"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("profiles", {
            id: {
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                allowNull: false,
                type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
                references: { model: "users", key: "id" },
                onDelete: "CASCADE",
            },
            // photo_id: {
            //   type: DataTypes.STRING,
            //   allowNull: true,
            // },
            // photo_secure_url: {
            //   type: DataTypes.STRING,
            //   allowNull: true,
            // },
            phoneno: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("profiles");
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMzAzMjAwNTE5MDQtYWRkLXByb2ZpbGUtdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0YWJhc2UvbWlncmF0aW9ucy8yMDIzMDMyMDA1MTkwNC1hZGQtcHJvZmlsZS10YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUE2RTtBQUU3RSxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsRUFBRSxFQUFFLENBQUMsY0FBOEIsRUFBRSxFQUFFO1FBQ3JDLE9BQU8sY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDNUMsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUMvQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsYUFBYSxFQUFFLElBQUk7YUFDcEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUMvQixVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7Z0JBQ3pDLFFBQVEsRUFBRSxTQUFTO2FBQ3BCO1lBQ0QsY0FBYztZQUNkLDRCQUE0QjtZQUM1QixxQkFBcUI7WUFDckIsS0FBSztZQUNMLHNCQUFzQjtZQUN0Qiw0QkFBNEI7WUFDNUIscUJBQXFCO1lBQ3JCLEtBQUs7WUFDTCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLElBQUk7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztnQkFDcEQsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FDN0IsK0NBQStDLENBQ2hEO2dCQUNELFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLGNBQThCLEVBQUUsU0FBYyxFQUFFLEVBQUU7UUFDdkQsT0FBTyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFDIn0=