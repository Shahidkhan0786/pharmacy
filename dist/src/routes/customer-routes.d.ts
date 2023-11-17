import express, { Router } from 'express';
import { RoutesConfig } from './routes.config';
export declare class CustomerRoutes extends RoutesConfig {
    route: Router;
    constructor(app: express.Application);
    configureRoutes(): express.Application;
}
