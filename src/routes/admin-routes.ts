import express, { RequestHandler, Router } from "express";
import { RoutesConfig } from "./routes.config";
import { AdminAuthMiddleware } from "../middlewares/admin-auth-middleware";
import {
  LoanController,
  DistributorController,
  LoanTakerController,
  LoanTransactionController,
} from "../controllers/controller";

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
    this.loanTransactionRoutes();
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
    route.post("/detail", controller.detail);
    route.post("/update-status", controller.updateStatus);
    route.post("/delete", controller.del);
    route.post("/loan/loans-list", controller.loanList);
    route.post("/transaction/transactions-list", controller.transactionList);
    route.post("/loan/loan-detail", controller.loanDetail);
    this.route.use("/loan-taker", route);
  }

  loanRoutes() {
    const route = express.Router();
    const controller = LoanController.init();
    route.get("/list", controller.list);
    route.post("/detail", controller.detail);
    route.post("/add", controller.save);
    route.post("/update", controller.update);
    route.post("/update-status", controller.updateStatus);
    route.post("/delete", controller.del);
    this.route.use("/loan", route);
  }

  loanTransactionRoutes() {
    const route = express.Router();
    const controller = LoanTransactionController.init();
    route.get("/list", controller.list);
    route.post("/detail", controller.detail);
    route.post("/add", controller.save);
    route.post("/update", controller.update);
    route.post("/update-status", controller.updateStatus);
    route.post("/delete", controller.del);
    this.route.use("/loan-transaction", route);
  }
}
