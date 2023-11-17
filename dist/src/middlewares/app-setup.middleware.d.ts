import express from "express";
import { Middleware } from "./middleware";
export declare class AppSetupMiddleware extends Middleware {
    app: express.Application;
    constructor(app: express.Application);
    handle(): void;
    responseMiddleware(req: express.Request, res: express.Response, next: any): void;
    httpLogs(): void;
}
