"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/connection");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const enum_1 = require("../constants/enum");
const helper_1 = require("../helpers/helper");
const profile_1 = require("./profile");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_crypto_1 = __importDefault(require("node:crypto"));
class User extends sequelize_1.Model {
    getFullname() {
        return [this.firstName, this.lastName].join(" ");
    }
    validPassword(password) {
        return bcryptjs_1.default.compareSync(password, this.password);
    }
    getJwtToken() {
        return jsonwebtoken_1.default.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ExpiresIn,
        });
    }
    getForgotpasswordToken() {
        const token = node_crypto_1.default.randomBytes(20).toString("hex");
        this.ForgotpasswordToken = node_crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        this.ForgotpasswordExpires = Date.now() + 10 * 60 * 1000;
        // console.log("innnnnn token" , token)
        // console.log(this.ForgotpasswordExpires)
        return token;
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...(0, helper_1.enumKeys)(enum_1.UserTypeEnum)),
        defaultValue: enum_1.UserTypeEnum.Admin,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false,
    },
    ForgotpasswordToken: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
    ForgotpasswordExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
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
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.password) {
                const salt = yield bcryptjs_1.default.genSaltSync(10);
                user.password = bcryptjs_1.default.hashSync(user.password, salt);
            }
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.password) {
                const salt = yield bcryptjs_1.default.genSaltSync(10);
                user.password = bcryptjs_1.default.hashSync(user.password, salt);
            }
        }),
        beforeDestroy: (user) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("userrrr deletedd");
            try {
                console.log(user);
                yield profile_1.Profile.destroy({ where: { userId: user.id } });
                console.log("profile deleted");
            }
            catch (err) {
                console.log("error in del profile");
            }
        }),
        //end hooks
    },
    sequelize: connection_1.sequelize,
    timestamps: false,
    tableName: "users",
});
User.hasOne(profile_1.Profile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
profile_1.Profile.belongsTo(User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
// User.hasMany(Contact,{
//     foreignKey:'userId'
// })
// Contact.belongsTo(User)
// User.hasOne(ProductReview , {
//   foreignKey: 'user_id'
// })
// ProductReview.belongsTo(User,{
//   foreignKey: 'user_id'
// })
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FPbUI7QUFDbkIscURBQWlEO0FBQ2pELHdEQUF5QztBQUN6Qyw0Q0FBaUQ7QUFDakQsOENBQTZDO0FBQzdDLHVDQUFvQztBQUNwQyxnRUFBK0I7QUFDL0IsOERBQWlDO0FBR2pDLE1BQWEsSUFBSyxTQUFRLGlCQUd6QjtJQVlDLFdBQVc7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxhQUFhLENBQUMsUUFBYTtRQUN6QixPQUFPLGtCQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLHNCQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUN2RCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsTUFBTSxLQUFLLEdBQUcscUJBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxxQkFBTTthQUM5QixVQUFVLENBQUMsUUFBUSxDQUFDO2FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUN6RCx1Q0FBdUM7UUFDdkMsMENBQTBDO1FBQzFDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBeENELG9CQXdDQztBQUVELElBQUksQ0FBQyxJQUFJLENBQ1A7SUFDRSxFQUFFLEVBQUU7UUFDRixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUTtRQUMvQixVQUFVLEVBQUUsSUFBSTtRQUNoQixhQUFhLEVBQUUsSUFBSTtLQUNwQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDM0I7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0tBQzNCO0lBRUQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMzQixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxxQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEsaUJBQVEsRUFBQyxtQkFBWSxDQUFDLENBQUM7UUFDL0MsWUFBWSxFQUFFLG1CQUFZLENBQUMsS0FBSztRQUNoQyxTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDNUIsU0FBUyxFQUFFLEtBQUs7S0FDakI7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQzNCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0lBQ0QscUJBQXFCLEVBQUU7UUFDckIsSUFBSSxFQUFFLHFCQUFTLENBQUMsSUFBSTtRQUNwQixTQUFTLEVBQUUsSUFBSTtRQUNmLFlBQVksRUFBRSxJQUFJO0tBQ25CO0lBRUQsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFdBQVc7UUFDakIsWUFBWSxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ3BELFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFdBQVc7UUFDakIsWUFBWSxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUM3QiwrQ0FBK0MsQ0FDaEQ7UUFDRCxTQUFTLEVBQUUsS0FBSztLQUNqQjtDQUNGLEVBQ0Q7SUFDRSxLQUFLLEVBQUU7UUFDTCxZQUFZLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2RDtRQUNILENBQUMsQ0FBQTtRQUNELFlBQVksRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1lBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsTUFBTSxJQUFJLEdBQUcsTUFBTSxrQkFBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxrQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsYUFBYSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDaEM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUE7UUFFRCxXQUFXO0tBQ1o7SUFDRCxTQUFTLEVBQVQsc0JBQVM7SUFDVCxVQUFVLEVBQUUsS0FBSztJQUNqQixTQUFTLEVBQUUsT0FBTztDQUNuQixDQUNGLENBQUM7QUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFPLEVBQUU7SUFDbkIsVUFBVSxFQUFFLFFBQVE7SUFDcEIsUUFBUSxFQUFFLFNBQVM7SUFDbkIsUUFBUSxFQUFFLFNBQVM7Q0FDcEIsQ0FBQyxDQUFDO0FBRUgsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO0lBQ3RCLFFBQVEsRUFBRSxTQUFTO0lBQ25CLFFBQVEsRUFBRSxTQUFTO0NBQ3BCLENBQUMsQ0FBQztBQUVILHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsS0FBSztBQUVMLDBCQUEwQjtBQUUxQixnQ0FBZ0M7QUFDaEMsMEJBQTBCO0FBQzFCLEtBQUs7QUFFTCxpQ0FBaUM7QUFDakMsMEJBQTBCO0FBQzFCLEtBQUsifQ==