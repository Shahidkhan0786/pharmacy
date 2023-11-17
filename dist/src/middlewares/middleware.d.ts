import express from 'express';
export type callback = () => void;
export declare abstract class Middleware {
    app: express.Application;
    constructor(app: express.Application);
    abstract handle(req: express.Request, res: express.Response, next: callback): any;
}
