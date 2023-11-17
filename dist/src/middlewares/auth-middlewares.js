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
exports.AuthMiddleware = void 0;
const middleware_1 = require("./middleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
class AuthMiddleware extends middleware_1.Middleware {
    constructor(app) {
        super(app);
    }
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hii auth middleware");
            const token = req.cookies.token || (typeof req.headers['authorization'] === 'string' ? req.headers['authorization'].replace('Bearer ', '') : '');
            if (!token) {
                return res.Error("You are not a valid user");
            }
            try {
                const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const user = yield user_1.User.findByPk(decode.id, {
                    attributes: ['id', 'firstName', 'email', 'role']
                });
                if (!user)
                    return res.Error("You are not a valid user");
                req.user = user;
                // console.log(user)
                next();
            }
            catch (err) {
                console.log("Error in authentication");
                return res.Error("Error in authentication");
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1taWRkbGV3YXJlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlcy9hdXRoLW1pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUFvRDtBQUNwRCxnRUFBZ0Q7QUFDaEQseUNBQXNDO0FBRXRDLE1BQWEsY0FBZSxTQUFRLHVCQUFVO0lBRTFDLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVLLE1BQU0sQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBYzs7WUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQ2xDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqSixJQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsSUFBRztnQkFDQyxNQUFNLE1BQU0sR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQWUsQ0FBQztnQkFDdkUsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUM7b0JBQ3ZDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztpQkFDakQsQ0FBQyxDQUFDO2dCQUNILElBQUcsQ0FBQyxJQUFJO29CQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN2RCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDaEIsb0JBQW9CO2dCQUNwQixJQUFJLEVBQUUsQ0FBQzthQUNWO1lBQUEsT0FBTSxHQUFHLEVBQUM7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO2dCQUN0QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUM7S0FBQTtDQUNKO0FBMUJELHdDQTBCQyJ9