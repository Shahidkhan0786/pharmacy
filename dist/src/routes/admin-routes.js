"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const routes_config_1 = require("./routes.config");
const admin_auth_middleware_1 = require("../middlewares/admin-auth-middleware");
const DistributorController_1 = require("../controllers/DistributorController");
const LoanTakerController_1 = require("../controllers/LoanTakerController");
const LoanController_1 = require("../controllers/LoanController");
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
        return this.app;
    }
    distributorRoutes() {
        const route = express_1.default.Router();
        const controller = DistributorController_1.DistributorController.init();
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
        const controller = LoanTakerController_1.LoanTakerController.init();
        route.get("/list", controller.list);
        route.post("/add", controller.save);
        route.post("/update", controller.update);
        route.post("/update-status", controller.updateStatus);
        route.post("/delete", controller.del);
        this.route.use("/loan-taker", route);
    }
    loanRoutes() {
        const route = express_1.default.Router();
        const controller = LoanController_1.LoanController.init();
        route.get("/list", controller.list);
        route.post("/add", controller.save);
        route.post("/update", controller.update);
        route.post("/update-status", controller.updateStatus);
        route.post("/delete", controller.del);
        this.route.use("/loan", route);
    }
}
exports.AdminRoutes = AdminRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tcm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9hZG1pbi1yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTBEO0FBQzFELG1EQUErQztBQUMvQyxnRkFBMkU7QUFDM0UsZ0ZBQTZFO0FBQzdFLDRFQUF5RTtBQUN6RSxrRUFBOEQ7QUFDOUQsZ0RBQWdEO0FBRWhELE1BQWEsV0FBWSxTQUFRLDRCQUFZO0lBRTNDLFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU5QiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ1YsWUFBWSxFQUNaLElBQUksMkNBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FDWCxDQUFDO1FBQ0Ysd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixNQUFNLEtBQUssR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLDZDQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hELG1EQUFtRDtRQUNuRCxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyx5Q0FBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRywrQkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUVGO0FBeERELGtDQXdEQyJ9