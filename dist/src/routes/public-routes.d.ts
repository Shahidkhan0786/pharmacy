import express, { Router } from "express";
import { RoutesConfig } from "./routes.config";
export declare class PublicRoutes extends RoutesConfig {
    route: Router;
    constructor(app: express.Application);
    configureRoutes(): express.Application;
    authRoutes(): void;
    userRoutes(): void;
}
