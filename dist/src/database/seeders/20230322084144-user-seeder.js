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
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../constants/enum");
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.bulkInsert("users", [
                {
                    firstName: "abdul",
                    lastName: "hai",
                    email: "admin@mail.com",
                    role: enum_1.UserTypeEnum.Admin,
                    password: "$2a$05$oQyxb1XHx1awGVLwf/7f3emoLV.deo5tyigEeMzRCDjhAOHMbLy5C",
                    // emailVerifiedAt: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("users", null, {});
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMzAzMjIwODQxNDQtdXNlci1zZWVkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0YWJhc2Uvc2VlZGVycy8yMDIzMDMyMjA4NDE0NC11c2VyLXNlZWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7O0FBRWIsK0NBQW9EO0FBR3BELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDVCxFQUFFLENBQUMsY0FBbUIsRUFBRSxTQUFjOztZQUMxQyxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO2dCQUN4QztvQkFDRSxTQUFTLEVBQUUsT0FBTztvQkFDbEIsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsSUFBSSxFQUFFLG1CQUFZLENBQUMsS0FBSztvQkFDeEIsUUFBUSxFQUNOLDhEQUE4RDtvQkFDaEUsK0JBQStCO29CQUMvQixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtpQkFDdEI7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFSyxJQUFJLENBQUMsY0FBbUIsRUFBRSxTQUFjOztZQUM1QyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7Q0FDRixDQUFDIn0=