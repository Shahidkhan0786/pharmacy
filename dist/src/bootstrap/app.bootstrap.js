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
exports.App = void 0;
const http_1 = __importDefault(require("http"));
const app_setup_middleware_1 = require("../middlewares/app-setup.middleware");
const public_routes_1 = require("../routes/public-routes");
require("dotenv").config();
const path = require("path");
const admin_routes_1 = require("../routes/admin-routes");
const customer_routes_1 = require("../routes/customer-routes");
// import chalk from 'chalk';
class App {
    //io: Server;
    constructor(app) {
        this.app = app;
        this.app.set("view engine", "ejs");
        this.app.get("/", function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                res.send("----- KharidLo App NodeJS API -----");
            });
        });
        //declear global socket veriable  start
        const server = http_1.default.createServer(this.app);
        this.registerMiddlewares();
        this.registerRoutes();
        this.startServer(server);
    }
    registerRoutes() {
        new public_routes_1.PublicRoutes(this.app);
        new admin_routes_1.AdminRoutes(this.app);
        new customer_routes_1.CustomerRoutes(this.app);
    }
    registerMiddlewares() {
        const middlewares = new app_setup_middleware_1.AppSetupMiddleware(this.app);
        middlewares.handle();
    }
    startServer(server) {
        const port = Number(process.env.PORT_NO) || 3019;
        server.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJvb3RzdHJhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ib290c3RyYXAvYXBwLmJvb3RzdHJhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBd0I7QUFFeEIsOEVBQXlFO0FBQ3pFLDJEQUF1RDtBQUN2RCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCLHlEQUFxRDtBQUNyRCwrREFBMkQ7QUFHM0QsNkJBQTZCO0FBRTdCLE1BQWEsR0FBRztJQUVkLGFBQWE7SUFDYixZQUFZLEdBQXdCO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFnQixHQUFRLEVBQUUsR0FBUTs7Z0JBQ2xELEdBQUcsQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUNsRCxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRUgsdUNBQXVDO1FBQ3ZDLE1BQU0sTUFBTSxHQUFnQixjQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksNEJBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSwwQkFBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLGdDQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxtQkFBbUI7UUFDakIsTUFBTSxXQUFXLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBbUI7UUFDN0IsTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkNELGtCQW1DQyJ9