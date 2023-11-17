import express from 'express';
import { Middleware, callback } from './middleware';
export declare class AuthMiddleware extends Middleware {
    constructor(app: express.Application);
    handle(req: express.Request, res: express.Response, next: callback): Promise<void>;
}
