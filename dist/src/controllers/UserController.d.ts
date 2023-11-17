import express from 'express';
export declare class UserController {
    private static instance;
    private constructor();
    static init(): UserController;
    list(req: express.Request, res: express.Response): Promise<void>;
    store(req: express.Request, res: express.Response): Promise<void>;
    del(req: express.Request, res: express.Response): Promise<void>;
}
