import { errors } from "celebrate";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../../docs/api-spec.json";
import Database from "../infra/config/database";
import Ioc from "../infra/config/ioc";
import logger from "../infra/config/logger";
import routes from "./routes/routes";

dotenv.config();

// Starting database
const database = new Database();
database.startService();

// Starting inversion of control
const ioc = new Ioc();
ioc.configureServices();

// Starting web server
const app = express();

// Setting api docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Setting configurations
app.use(cors());
app.use(helmet());
app.use(pinoHttp({ logger }));
app.use(express.json());
app.use("/v1/", routes);
app.use(errors());

export default app;
