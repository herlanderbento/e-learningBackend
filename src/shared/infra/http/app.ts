import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { resolve } from "path";
import cors from "cors";

import "@shared/container";
import createConnection from "@shared/infra/typeorm";
import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  "/files/avatar",
  express.static(resolve(__dirname, "../../../../", "tmp/avatar"))
);
app.use(router);

app.get("/", (request, response) => {
  return response.json({ message: "Hello world!" });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
