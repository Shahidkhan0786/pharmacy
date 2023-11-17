import express from 'express';
import { Middleware, callback } from './middleware';
export declare class AdminAuthMiddleware extends Middleware {
    constructor(app: express.Application);
    handle(req: express.Request, res: express.Response, next: callback): express.Response<any, Record<string, any>>;
}
