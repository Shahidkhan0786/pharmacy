import express, { RequestHandler, Router } from "express";
import { RoutesConfig } from "./routes.config";
import { AdminAuthMiddleware } from "../middlewares/admin-auth-middleware";
import { DistributorController } from "../controllers/DistributorController";
import { LoanTakerController } from "../controllers/LoanTakerController";
import { LoanController} from "../controllers/LoanController";
// import {uploadFiles} from "../helpers/helper"

export class AdminRoutes extends RoutesConfig {
  route: Router;
  constructor(app: express.Application) {
    super(app, "AdminRoutes");
  }

  configureRoutes() {
    this.route = express.Router();

    // this.app.use('/api/admin', )
    this.app.use(
      "/api/admin",
      new AdminAuthMiddleware(this.app).handle,
      this.route
    );
    // this.categoryRoutes()
    this.distributorRoutes();
    this.loanTakerRoutes();
    this.loanRoutes();
    return this.app;
  }

  distributorRoutes() {
    const route = express.Router();
    const controller = DistributorController.init();
    // route.post("/create", controller.storeCategory);
    route.get("/list", controller.list);
    route.post("/add", controller.save);
    route.post("/update", controller.update);
    route.post("/update-status", controller.updateStatus);
    route.post("/delete", controller.del);
    this.route.use("/distributor", route);
  }

  loanTakerRoutes() {
    const route = express.Router();
    const controller = LoanTakerController.init();
    route.get("/list", controller.list);
    route.post("/add", controller.save);
    route.post("/update", controller.update);
    route.post("/update-status", controller.updateStatus);
    route.post("/delete", controller.del);
    route.post("/loans-list", controller.loanList);
    this.route.use("/loan-taker", route);
  }

  loanRoutes() {
    const route = express.Router();
    const controller = LoanController.init();
    route.get("/list", controller.list);
    route.post("/add", controller.save);
    route.post("/update", controller.update);
    route.post("/update-status", controller.updateStatus);
    route.post("/delete", controller.del);
    this.route.use("/loan", route);
  }

}
