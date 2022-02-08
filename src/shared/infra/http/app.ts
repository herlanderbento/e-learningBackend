import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";

import "@shared/container";
import createConnection from "@shared/infra/typeorm";
import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Hello world!" });
});

app.use(router);

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
