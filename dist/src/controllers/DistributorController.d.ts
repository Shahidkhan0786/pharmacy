import express from "express";
export declare class DistributorController {
    private static instance;
    private constructor();
    static init(): DistributorController;
    list(req: express.Request, res: express.Response): Promise<void>;
    save(req: express.Request, res: express.Response): Promise<void>;
    update(req: express.Request, res: express.Response): Promise<void>;
    updateStatus(req: express.Request, res: express.Response): Promise<void>;
    del(req: express.Request, res: express.Response): Promise<void>;
}
