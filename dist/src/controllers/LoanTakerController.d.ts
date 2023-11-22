import express from "express";
export declare class LoanTakerController {
    private static instance;
    private constructor();
    static init(): LoanTakerController;
    list(req: express.Request, res: express.Response): Promise<void>;
    loanList(req: express.Request, res: express.Response): Promise<void>;
    save(req: express.Request, res: express.Response): Promise<void>;
    update(req: express.Request, res: express.Response): Promise<void>;
    updateStatus(req: express.Request, res: express.Response): Promise<void>;
    del(req: express.Request, res: express.Response): Promise<void>;
}
