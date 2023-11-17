import { App } from "./src/bootstrap/app.bootstrap";
import express from "express";

/* --------------------------
 * Application Configurations
 * -------------------------- */
export const app = new App(express());
