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
exports.UserController = void 0;
const user_1 = require("../models/user");
const cloudinary = require('cloudinary').v2;
class UserController {
    constructor() {
    }
    static init() {
        if (this.instance == null) {
            this.instance = new UserController();
        }
        return this.instance;
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log( Date.now())
            // console.log( new Date(Date.now()).toLocaleTimeString())
            // console.log( process.env.TZ)
            let data = yield user_1.User.findAll();
            res.status(200).json({
                status: true,
                message: "ok",
                data
            });
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.User.create({
                firstName: 'shahid',
                lastName: 'khan',
                email: 'shahid@gmail.com',
                password: "12345",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            res.json({
                status: "ok",
                result
            });
        });
    }
    // del user 
    del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield user_1.User.destroy({
                    where: {
                        id: Number(req.query.id)
                    }
                });
            }
            catch (err) {
                res.Error("error in deleting user");
            }
            res.Success("Successfullt deleted");
        });
    }
}
UserController.instance = null;
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvVXNlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBR3RDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDNUMsTUFBYSxjQUFjO0lBR3ZCO0lBRUEsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJO1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUE7U0FDdkM7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDeEIsQ0FBQztJQUVLLElBQUksQ0FBQyxHQUFtQixFQUFDLEdBQW9COztZQUMvQywyQkFBMkI7WUFDM0IsMERBQTBEO1lBQzFELCtCQUErQjtZQUUvQixJQUFJLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSTthQUNQLENBQUMsQ0FBQTtRQUNOLENBQUM7S0FBQTtJQUVLLEtBQUssQ0FBQyxHQUFtQixFQUFHLEdBQW9COztZQUNsRCxNQUFNLE1BQU0sR0FBRyxNQUFNLFdBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLFNBQVMsRUFBQyxRQUFRO2dCQUNsQixRQUFRLEVBQUMsTUFBTTtnQkFDZixLQUFLLEVBQUMsa0JBQWtCO2dCQUN4QixRQUFRLEVBQUMsT0FBTztnQkFDaEIsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNyQixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7YUFDeEIsQ0FBQyxDQUFBO1lBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNO2FBQ1QsQ0FBQyxDQUFBO1FBQ04sQ0FBQztLQUFBO0lBRUQsWUFBWTtJQUNOLEdBQUcsQ0FBQyxHQUFtQixFQUFDLEdBQW9COztZQUk5QyxJQUFHO2dCQUNDLElBQUksSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDMUIsS0FBSyxFQUFFO3dCQUNOLEVBQUUsRUFBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7cUJBQ3pCO2lCQUNGLENBQUMsQ0FBQzthQUNSO1lBQ0QsT0FBTSxHQUFHLEVBQUM7Z0JBQ04sR0FBRyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ3ZDO1lBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7S0FBQTs7QUEzRGMsdUJBQVEsR0FBMEIsSUFBSSxDQUFDO0FBRDdDLHdDQUFjIn0=