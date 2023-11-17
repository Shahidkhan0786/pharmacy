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
exports.AdminAuthMiddleware = void 0;
const enum_1 = require("./../constants/enum");
const middleware_1 = require("./middleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
class AdminAuthMiddleware extends middleware_1.Middleware {
    constructor(app) {
        super(app);
    }
    handle(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.Error('You are not Authorized');
            }
            const userr = yield user_1.User.findByPk(user.id, {
                attributes: ['id', 'firstName', 'email', 'role']
            });
            req.user = userr;
            // console.log("userrrr",userr)
            console.log('role ============>', userr.role);
            if (userr.role === enum_1.UserTypeEnum.Admin) {
                next();
            }
            else {
                return res.Error('You are not Authorized as Admin');
            }
        }));
    }
}
exports.AdminAuthMiddleware = AdminAuthMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tYXV0aC1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21pZGRsZXdhcmVzL2FkbWluLWF1dGgtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBbUQ7QUFFbkQsNkNBQW9EO0FBQ3BELGdFQUErQjtBQUMvQix5Q0FBc0M7QUFFdEMsTUFBYSxtQkFBb0IsU0FBUSx1QkFBVTtJQUUvQyxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFQSxNQUFNLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQWM7UUFDL0QsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxNQUFNLEtBQUssR0FBRyxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7UUFFRCxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFvQixFQUFFLENBQU8sR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFFO1lBQzlFLElBQUksR0FBRyxFQUFFO2dCQUNMLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUM7Z0JBQ3RDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQzthQUNqRCxDQUFDLENBQUE7WUFDRixHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNqQiwrQkFBK0I7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLG1CQUFZLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFJLEVBQUUsQ0FBQzthQUNWO2lCQUFNO2dCQUNILE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO2FBQ3REO1FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTlCRCxrREE4QkMifQ==