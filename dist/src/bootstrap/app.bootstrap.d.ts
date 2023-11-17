/// <reference types="node" />
import express from "express";
import http from "http";
export declare class App {
    app: express.Application;
    constructor(app: express.Application);
    registerRoutes(): void;
    registerMiddlewares(): void;
    startServer(server: http.Server): void;
}
