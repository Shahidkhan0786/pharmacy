import multer from "multer";
import express from "express";
import { User } from "../models/user";
export declare class Helper {
}
export declare function enumKeys(data: any): Array<string>;
export declare const paging: (results: any, page: number, perPage: number) => {
    totalItems: any;
    data: any;
    totalPages: number;
    currentPage: number;
    perPage: number;
};
export declare function uploads(): multer.Multer;
export declare function uploadFiles(): multer.Multer;
export declare function cookietoken(user: User, res: express.Response): void;
export declare function sendmail(options: any): Promise<void>;
