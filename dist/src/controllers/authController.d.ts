import express, { NextFunction } from "express";
import { Controller } from "./controller";
export declare class AuthController extends Controller {
    private static instance;
    private constructor();
    static init(): AuthController;
    signUp(req: express.Request, res: express.Response): Promise<void>;
    Signin(req: express.Request, res: express.Response): Promise<void>;
    logout(req: express.Request, res: express.Response): Promise<void>;
    ForgotPassword(req: express.Request, res: express.Response): Promise<void>;
    resetpassword(req: express.Request, res: express.Response, next: NextFunction): Promise<void>;
    validatetoken(req: express.Request, res: express.Response): Promise<void>;
    isUserIsValid(req: express.Request, res: express.Response): Promise<void>;
}
