import "reflect-metadata";

import express, { Application } from "express";
import "./config";
import router from "./routes";
import morgan from "morgan";
import { handleErrors } from "./middlewares";
const app: Application = express();
app.use(morgan("dev"));
app.use(router);
app.use(handleErrors);
export default app;
