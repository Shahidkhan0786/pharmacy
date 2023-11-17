import express, { NextFunction } from 'express';
export type callback = () => void

export abstract class Middleware {
    public app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }

    abstract handle(req: express.Request, res: express.Response, next: callback): any;
}