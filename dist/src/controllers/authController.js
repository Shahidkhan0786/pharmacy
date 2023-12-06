"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthController = void 0;
const controller_1 = require("./controller");
const user_1 = require("../models/user");
const joi_1 = __importStar(require("joi"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const helper_1 = require("../helpers/helper");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const profile_1 = require("../models/profile");
class AuthController extends controller_1.Controller {
    constructor() {
        super();
    }
    static init() {
        if (this.instance == null) {
            this.instance = new AuthController();
        }
        return this.instance;
    }
    //    signup method
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body)
            const schema = joi_1.default.object().keys({
                firstName: joi_1.default.string(),
                lastName: joi_1.default.string().optional().allow(""),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string(),
            });
            let result;
            const { error, value } = schema.validate(req.body);
            if (error instanceof joi_1.ValidationError) {
                return res.Error(error.details[0].message);
            }
            //check user is exists or not
            const user = yield user_1.User.findOne({
                where: { email: req.body.email },
            });
            if (user != null) {
                return res.Error("User already exixts");
            }
            // if(req.file){
            //     result = await cloudinary.v2.uploader.upload(req.file.path, {
            //         folder: 'users',
            //         width: 150,
            //         height: 150,
            //         crop: 'fill',
            //     });
            // }
            const { firstName, lastName, email, password } = req.body;
            const newUser = yield user_1.User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            // if (newUser && req.file) {
            //   await Profile.create({
            //     userId: newUser.id,
            //     photo_id: result.public_id,
            //     photo_secure_url: result.secure_url,
            //     createdAt: new Date(),
            //     updatedAt: new Date(),
            //   });
            // }
            if (newUser) {
                yield profile_1.Profile.create({
                    userId: newUser.id,
                    // photo_id: result.public_id,
                    // photo_secure_url: result.secure_url,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            newUser.password = undefined;
            // cookietoken(newUser, res);
            (0, helper_1.cookietoken)(newUser, res);
        });
    }
    // sign
    Signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("signinn");
            console.log(req.body);
            const schema = joi_1.default.object().keys({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error instanceof joi_1.ValidationError) {
                return res.Error(error.details[0].message);
            }
            const { email, password } = req.body;
            console.log(req.body);
            if (!email || !password) {
                return res.Error("Please provide email password");
            }
            const user = yield user_1.User.findOne({ where: { email: email } });
            if (!user) {
                return res.Error("Please provide correct cradentials");
            }
            const isMatch = yield user.validPassword(password);
            if (!isMatch) {
                // return next(new customerror("Invalid email or password" ,400));
                return res.Error("Please provide correct email and password");
            }
            (0, helper_1.cookietoken)(user, res);
        });
    }
    // logout
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.cookie("token", "null", {
                expires: new Date(Date.now()),
                httpOnly: true,
            });
            res.Success("Logout successfully");
        });
    }
    // Forgot password
    ForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                // return next(new customerror("Please provide email", 400));
                return res.Error("Please provide email");
            }
            const user = yield user_1.User.findOne({ where: { email: email } });
            if (!user) {
                return res.Error("Invalid email");
            }
            const token = yield user.getForgotpasswordToken();
            // console.log("outt tokeeennn",token)
            user.ForgotpasswordToken = token;
            yield user.save();
            // const url:string = `${req.protocol}://${req.get("host")}/api/public/auth/token/validate/${token}`;
            const url = `http://localhost:4200/reset-password/${token}`;
            // http://localhost:4200/user/reset
            // const url =  token;
            // const message = `copy paste this link to reset your password \n\n ${url}`;
            const html = `<p>click on me</p><a href=${url}>click me</a>`;
            const message = `copy this token\n\n ${token}`;
            // const html = `<p>copy paste this token in reset form</p><h2>copy me</h2> <h1>${token}</h1>`;
            try {
                yield (0, helper_1.sendmail)({
                    subject: "Reset Password",
                    text: message,
                    email,
                    html,
                }); //send mail
                res.status(200).json({
                    success: true,
                    data: { message: "Token sent to email" },
                });
            }
            catch (err) {
                console.log(err);
                user.ForgotpasswordToken = undefined;
                user.ForgotpasswordExpires = undefined;
                yield user.save();
                return res.Error(`Email could not be sent ${err}`);
            }
        });
    }
    // reset password
    resetpassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.params);
            const { password, confirmPassword } = req.body;
            if (!password || !confirmPassword) {
                return res.Error("Please provide password and confirm password");
            }
            if (password !== confirmPassword) {
                return res.Error("Password and confirm password do not match");
            }
            const resetPasswordToken = node_crypto_1.default
                .createHash("sha256")
                .update(req.params.token)
                .digest("hex");
            const user = yield user_1.User.findOne({
                where: {
                    [sequelize_1.Op.and]: [{ ForgotpasswordToken: req.params.token }],
                },
            });
            console.log("Userrrr", user);
            if (!user ||
                (user && (0, moment_1.default)(user.ForgotpasswordExpires).isBefore((0, moment_1.default)()))) {
                return res.Error("Invalid token");
            }
            user.password = password;
            user.ForgotpasswordToken = undefined;
            user.ForgotpasswordExpires = undefined;
            yield user.save();
            res.status(200).json({
                success: true,
                data: { message: "Password reset successfully" },
            });
        });
    }
    validatetoken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            if (!token) {
                return res.Error("Please provide a token");
            }
            const user = yield user_1.User.findOne({ where: { ForgotpasswordToken: token } });
            if (!user) {
                return res.Error("invalid token");
            }
            return res.Success("varified");
        });
    }
    // check is token is validate or not
    isUserIsValid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token ||
                (typeof req.headers["authorization"] === "string"
                    ? req.headers["authorization"].replace("Bearer ", "")
                    : "");
            if (!token) {
                return res.Error("You are not a valid user");
            }
            try {
                const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const user = yield user_1.User.findByPk(decode.id);
                if (!user)
                    return res.Error("You are not a valid user");
                // req.user = user;
                return res.Success("You are a valid user", user);
            }
            catch (err) {
                return res.Error("invalid");
            }
        });
    }
}
AuthController.instance = null;
exports.AuthController = AuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYXV0aENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBMEM7QUFDMUMseUNBQXNDO0FBQ3RDLDJDQUFxRDtBQUNyRCw4REFBaUM7QUFHakMsOENBQTBEO0FBQzFELHlDQUErQjtBQUMvQixvREFBNEI7QUFDNUIsZ0VBQStDO0FBQy9DLCtDQUE0QztBQUU1QyxNQUFhLGNBQWUsU0FBUSx1QkFBVTtJQUc1QztRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7U0FDdEM7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELG1CQUFtQjtJQUViLE1BQU0sQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN0RCx3QkFBd0I7WUFDeEIsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDL0IsU0FBUyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsS0FBSyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RDLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO2FBQ3ZCLENBQUMsQ0FBQztZQUVILElBQUksTUFBVyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxLQUFLLFlBQVkscUJBQWUsRUFBRTtnQkFDcEMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUM7WUFFRCw2QkFBNkI7WUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsT0FBTyxDQUFDO2dCQUM5QixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7YUFDakMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNoQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN6QztZQUNELGdCQUFnQjtZQUNoQixvRUFBb0U7WUFDcEUsMkJBQTJCO1lBQzNCLHNCQUFzQjtZQUN0Qix1QkFBdUI7WUFDdkIsd0JBQXdCO1lBQ3hCLFVBQVU7WUFDVixJQUFJO1lBQ0osTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxTQUFTLEVBQUUsU0FBUztnQkFDcEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQ3JCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTthQUN0QixDQUFDLENBQUM7WUFFSCw2QkFBNkI7WUFDN0IsMkJBQTJCO1lBQzNCLDBCQUEwQjtZQUMxQixrQ0FBa0M7WUFDbEMsMkNBQTJDO1lBQzNDLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsUUFBUTtZQUNSLElBQUk7WUFFSixJQUFJLE9BQU8sRUFBRTtnQkFDWCxNQUFNLGlCQUFPLENBQUMsTUFBTSxDQUFDO29CQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7b0JBQ2xCLDhCQUE4QjtvQkFDOUIsdUNBQXVDO29CQUN2QyxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtpQkFDdEIsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxPQUFPLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUM3Qiw2QkFBNkI7WUFFN0IsSUFBQSxvQkFBVyxFQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QixDQUFDO0tBQUE7SUFFRCxPQUFPO0lBQ0QsTUFBTSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDL0IsS0FBSyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RDLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2FBQ2xDLENBQUMsQ0FBQztZQUVILE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxLQUFLLFlBQVkscUJBQWUsRUFBRTtnQkFDcEMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUM7WUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7YUFDbkQ7WUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixrRUFBa0U7Z0JBQ2xFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO2FBQy9EO1lBQ0QsSUFBQSxvQkFBVyxFQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFRCxTQUFTO0lBQ0gsTUFBTSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtnQkFDMUIsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDN0IsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUQsa0JBQWtCO0lBRVosY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzlELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsNkRBQTZEO2dCQUM3RCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUMxQztZQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbkM7WUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ2xELHNDQUFzQztZQUN0QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLHFHQUFxRztZQUNyRyxNQUFNLEdBQUcsR0FBVyx3Q0FBd0MsS0FBSyxFQUFFLENBQUM7WUFDcEUsbUNBQW1DO1lBRW5DLHNCQUFzQjtZQUN0Qiw2RUFBNkU7WUFDN0UsTUFBTSxJQUFJLEdBQUcsNkJBQTZCLEdBQUcsZUFBZSxDQUFDO1lBQzdELE1BQU0sT0FBTyxHQUFHLHVCQUF1QixLQUFLLEVBQUUsQ0FBQztZQUMvQywrRkFBK0Y7WUFDL0YsSUFBSTtnQkFDRixNQUFNLElBQUEsaUJBQVEsRUFBQztvQkFDYixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLO29CQUNMLElBQUk7aUJBQ0wsQ0FBQyxDQUFDLENBQUMsV0FBVztnQkFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFO2lCQUN6QyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxTQUFTLENBQUM7Z0JBQ3ZDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDO0tBQUE7SUFFRCxpQkFBaUI7SUFDWCxhQUFhLENBQ2pCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQWtCOztZQUVsQiwyQkFBMkI7WUFDM0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2pDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsSUFBSSxRQUFRLEtBQUssZUFBZSxFQUFFO2dCQUNoQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQzthQUNoRTtZQUNELE1BQU0sa0JBQWtCLEdBQUcscUJBQU07aUJBQzlCLFVBQVUsQ0FBQyxRQUFRLENBQUM7aUJBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWpCLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDOUIsS0FBSyxFQUFFO29CQUNMLENBQUMsY0FBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN0RDthQUNGLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQ0UsQ0FBQyxJQUFJO2dCQUNMLENBQUMsSUFBSSxJQUFJLElBQUEsZ0JBQU0sRUFBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBQSxnQkFBTSxHQUFFLENBQUMsQ0FBQyxFQUMvRDtnQkFDQSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxTQUFTLENBQUM7WUFDdkMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxJQUFJO2dCQUNiLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRTthQUNqRCxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDN0QsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUM1QztZQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNuQztZQUVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFRCxvQ0FBb0M7SUFFOUIsYUFBYSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzdELE1BQU0sS0FBSyxHQUNULEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFDakIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssUUFBUTtvQkFDL0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDOUM7WUFDRCxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLHNCQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBZSxDQUFDO2dCQUN2RSxNQUFNLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsSUFBSTtvQkFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDeEQsbUJBQW1CO2dCQUNuQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEQ7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7UUFDSCxDQUFDO0tBQUE7O0FBalBjLHVCQUFRLEdBQTBCLElBQUksQ0FBQztBQUQzQyx3Q0FBYyJ9