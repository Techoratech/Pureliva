import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { env } from "../config/env.js";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown[] | undefined = undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  } else if (err?.name === "CastError") {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
  } else if (err?.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate entry: A record with that ${field} already exists.`;
  } else if (err?.name === "ValidationError") {
    statusCode = 400;
    message = "Database Validation Error";
    errors = Object.values(err.errors || {}).map((e: any) => ({
      path: e.path,
      message: e.message,
    }));
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Log error (suppress full stack in production for 4xx)
  if (statusCode >= 500) {
    logger.error(`[500 Server Error] ${err.message}`, err.stack);
  } else {
    logger.warn(`[${statusCode} Client Error] ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};
