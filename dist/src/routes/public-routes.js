"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoutes = void 0;
const express_1 = __importDefault(require("express"));
const routes_config_1 = require("./routes.config");
const UserController_1 = require("../controllers/UserController");
const authController_1 = require("../controllers/authController");
const helper_1 = require("../helpers/helper");
class PublicRoutes extends routes_config_1.RoutesConfig {
    constructor(app) {
        super(app, "PublicRoutes");
    }
    configureRoutes() {
        this.route = express_1.default.Router();
        this.app.use("/api/public", this.route);
        this.userRoutes();
        this.authRoutes();
        return this.app;
    }
    authRoutes() {
        const route = express_1.default.Router();
        const controller = authController_1.AuthController.init();
        route.post("/signup", (0, helper_1.uploads)().single("photo"), controller.signUp);
        route.post("/login", controller.Signin);
        route.post("/logout", controller.logout);
        route.post("/forgotpassword", controller.ForgotPassword);
        route.post("/password/reset/:token", controller.resetpassword);
        route.post("/token/validate/:token", controller.validatetoken);
        // varify user is valid
        route.post("/token/varify", controller.isUserIsValid);
        this.route.use("/auth", route);
    }
    userRoutes() {
        const route = express_1.default.Router();
        const controller = UserController_1.UserController.init();
        route.get("/list", controller.list);
        // route.get('/store', controller.store)
        // del the user
        route.delete("/del/user", controller.del);
        this.route.use("/", route);
    }
}
exports.PublicRoutes = PublicRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcHVibGljLXJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBMEM7QUFDMUMsbURBQStDO0FBQy9DLGtFQUErRDtBQUMvRCxrRUFBK0Q7QUFDL0QsOENBQXlEO0FBSXpELE1BQWEsWUFBYSxTQUFRLDRCQUFZO0lBRTVDLFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRywrQkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUEsZ0JBQU8sR0FBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxLQUFLLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCx1QkFBdUI7UUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsVUFBVTtRQUNSLE1BQU0sS0FBSyxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsK0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsd0NBQXdDO1FBQ3hDLGVBQWU7UUFDZixLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQXRDRCxvQ0FzQ0MifQ==