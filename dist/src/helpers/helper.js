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
exports.sendmail = exports.cookietoken = exports.uploadFiles = exports.uploads = exports.paging = exports.enumKeys = exports.Helper = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import nodemailer from "nodemailer";
const nodemailer = __importStar(require("nodemailer"));
class Helper {
}
exports.Helper = Helper;
function enumKeys(data) {
    const arrayobjects = [];
    for (const [propertyKey, propertyValue] of Object.entries(data)) {
        arrayobjects.push(propertyValue.toString());
    }
    return arrayobjects;
}
exports.enumKeys = enumKeys;
const paging = (results, page, perPage) => {
    const { count: totalItems, rows: data } = results;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / perPage);
    return { totalItems, data, totalPages, currentPage, perPage };
};
exports.paging = paging;
// multer config start
function uploads() {
    const storagePath = path_1.default.resolve("./", "storage", "users");
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, storagePath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
            cb(null, file.fieldname + "-" + uniqueSuffix);
        },
    });
    return (0, multer_1.default)({ storage: storage });
}
exports.uploads = uploads;
//upload multiple images
function uploadFiles() {
    const storagePath = path_1.default.resolve("./", "storage", "products");
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, storagePath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
            cb(null, file.fieldname + "-" + uniqueSuffix);
        },
    });
    return (0, multer_1.default)({ storage: storage });
}
exports.uploadFiles = uploadFiles;
// cookie helper function
function cookietoken(user, res) {
    const token = user.getJwtToken();
    const options = {
        expiresIn: new Date(Date.now() + process.env.COOKIE_TIMEOUT || 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    user.password = undefined;
    user.ForgotpasswordExpires = undefined;
    user.ForgotpasswordToken = undefined;
    res.status(200).cookie("token", token, options).json({
        success: true,
        token: token,
        data: user,
    });
}
exports.cookietoken = cookietoken;
// send mail helper
function sendmail(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(process.env);
        // create reusable transporter object using the default SMTP transport
        var transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const message = {
            from: ` ${process.env.MAIL_FROM_NAME}  <${process.env.MAIL_FROM_ADDRESS}>`,
            // from: `"My App Name" <${process.env.MAIL_FROM_ADDRESS}>`
            to: options.email,
            subject: options.subject,
            text: options.text,
            html: options.html, // html body
        };
        //     // send mail with defined transport object
        let info = yield transport.sendMail(message);
    });
}
exports.sendmail = sendmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLGdEQUF3QjtBQUV4Qix1Q0FBdUM7QUFDdkMsdURBQXlDO0FBR3pDLE1BQWEsTUFBTTtDQUFHO0FBQXRCLHdCQUFzQjtBQUV0QixTQUFnQixRQUFRLENBQUMsSUFBUztJQUNoQyxNQUFNLFlBQVksR0FBa0IsRUFBRSxDQUFDO0lBQ3ZDLEtBQUssTUFBTSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQy9ELFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDOUM7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBTkQsNEJBTUM7QUFFTSxNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQVksRUFBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDcEUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNsRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUNoRSxDQUFDLENBQUM7QUFMVyxRQUFBLE1BQU0sVUFLakI7QUFFRixzQkFBc0I7QUFDdEIsU0FBZ0IsT0FBTztJQUNyQixN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