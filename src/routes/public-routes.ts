import express, { Router } from "express";
import { RoutesConfig } from "./routes.config";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/authController";
import { uploads, uploadFiles } from "../helpers/helper";

import { Controller } from "../controllers/controller";

export class PublicRoutes extends RoutesConfig {
  route: Router;
  constructor(app: express.Application) {
    super(app, "PublicRoutes");
  }

  configureRoutes() {
    this.route = express.Router();

    this.app.use("/api/public", this.route);
    this.userRoutes();
    this.authRoutes();
    return this.app;
  }

  authRoutes() {
    const route = express.Router();
    const controller = AuthController.init();
    route.post("/signup", uploads().single("photo"), controller.signUp);
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
    const route = express.Router();
    const controller = UserController.init();

    route.get("/list", controller.list);
    // route.get('/store', controller.store)
    // del the user
    route.delete("/del/user", controller.del);
    this.route.use("/", route);
  }
}
