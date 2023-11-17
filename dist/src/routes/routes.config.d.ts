import express from "express";
export declare abstract class RoutesConfig {
    app: express.Application;
    name: string;
    constructor(app: express.Application, name: string);
    getName(): string;
    abstract configureRoutes(): express.Application;
}
