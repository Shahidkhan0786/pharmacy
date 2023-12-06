"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const routes_config_1 = require("./routes.config");
const admin_auth_middleware_1 = require("../middlewares/admin-auth-middleware");
const controller_1 = require("../controllers/controller");
// import {uploadFiles} from "../helpers/helper"
class AdminRoutes extends routes_config_1.RoutesConfig {
    constructor(app) {
        super(app, "AdminRoutes");
    }
    configureRoutes() {
        this.route = express_1.default.Router();
        // this.app.use('/api/admin', )
        this.app.use("/api/admin", new admin_auth_middleware_1.AdminAuthMiddleware(this.app).handle, this.route);
        // this.categoryRoutes()
        this.distributorRoutes();
        this.loanTakerRoutes();
        this.loanRoutes();
        this.loanTransactionRoutes();
        return this.app;
    }
    distributorRoutes() {
        const route = express_1.default.Router();
        const controller = controller_1.DistributorController.init();
        // route.post("/create", controller.storeCategory);
        route.get("/list", controller.list);
        route.post("/add", controller.save);
        route.post("/update", controller.update);
        route.post("/update-status", controller.updateStatus);
        route.post("/delete", controller.del);
        this.route.use("/distributor", route);
    }
    loanTakerRoutes() {
        const route = express_1.default.Router();
        const controller = controller_1.LoanTakerController.init();
        route.get("/list", controller.list);
        route.post("/add", controller.save);
        route.post("/update", controller.update);
        route.post("/detail", controller.detail);
        route.post("/update-status", controller.updateStatus);
        route.post("/delete", controller.del);
        route.post("/loan/loans-list", controller.loanList);
        route.post("/transaction/transactions-list", controller.transactionList);
        route.post("/loan/loan-detail", controller.loanDetail);
        this.route.use("/loan-taker", route);
    }
    loanRoutes() {
        const route = express_1.default.Router();
        const controller = controller_1.LoanController.init();
        route.get("/list", controller.list);
        route.post("/detail", controller.detail);
        route.post("/add", controller.save);
        route.post("/update", controller.update);
        route.post("/update-status", controller.updateStatus);
        route.post("/delete", controller.del);
        this.route.use("/loan", route);
    }
    loanTransactionRoutes() {
        const route = express_1.default.Router();
        const controller = controller_1.LoanTransactionController.init();
        route.get("/list", controller.list);
        route.post("/detail", controller.detail);
        route.post("/add", controller.save);
        route.post("/update", controller.update);
        route.post("/update-status", controller.updateStatus);
        route.post("/delete", controller.del);
        this.route.use("/loan-transaction", route);
    }
}
exports.AdminRoutes = AdminRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tcm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9hZG1pbi1yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTBEO0FBQzFELG1EQUErQztBQUMvQyxnRkFBMkU7QUFDM0UsMERBS21DO0FBRW5DLGdEQUFnRDtBQUVoRCxNQUFhLFdBQVksU0FBUSw0QkFBWTtJQUUzQyxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNWLFlBQVksRUFDWixJQUFJLDJDQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQ3hDLElBQUksQ0FBQyxLQUFLLENBQ1gsQ0FBQztRQUNGLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxrQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRCxtREFBbUQ7UUFDbkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJ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