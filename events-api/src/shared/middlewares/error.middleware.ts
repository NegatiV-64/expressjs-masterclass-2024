import { Logger } from "#/shared/libs/logger.lib";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "#/shared/errors/custom-error";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  Logger.error(`[${new Date().toISOString()}] ${err}`);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
}
