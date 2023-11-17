"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/connection");
const user_1 = require("./user");
class Profile extends sequelize_1.Model {
}
exports.Profile = Profile;
Profile.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.User,
            key: "id",
        },
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
}, {
    sequelize: connection_1.sequelize,
    timestamps: false,
    tableName: "profiles",
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvcHJvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FPbUI7QUFDbkIscURBQWlEO0FBR2pELGlDQUE4QjtBQUM5QixNQUFhLE9BQVEsU0FBUSxpQkFHNUI7Q0FZQTtBQWZELDBCQWVDO0FBRUQsT0FBTyxDQUFDLElBQUksQ0FDVjtJQUNFLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1FBQy9CLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztRQUN2QixTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUU7WUFDVixLQUFLLEVBQUUsV0FBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1NBQ1Y7S0FDRjtJQUNELGNBQWM7SUFDZCw0QkFBNEI7SUFDNUIscUJBQXFCO0lBQ3JCLEtBQUs7SUFDTCxzQkFBc0I7SUFDdEIsNEJBQTRCO0lBQzVCLHFCQUFxQjtJQUNyQixLQUFLO0lBQ0wsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMxQixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxXQUFXO1FBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztRQUNwRCxTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxXQUFXO1FBQ2pCLFlBQVksRUFBRSxxQkFBUyxDQUFDLE9BQU8sQ0FDN0IsK0NBQStDLENBQ2hEO1FBQ0QsU0FBUyxFQUFFLEtBQUs7S0FDakI7Q0FDRixFQUNEO0lBQ0UsU0FBUyxFQUFULHNCQUFTO0lBQ1QsVUFBVSxFQUFFLEtBQUs7SUFDakIsU0FBUyxFQUFFLFVBQVU7Q0FDdEIsQ0FDRixDQUFDIn0=