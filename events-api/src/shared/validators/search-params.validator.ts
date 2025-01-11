import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { parseSchemaError } from "#/shared/utils";

export function validateSearchParams(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestSearchParams = req.query;
      const parsedValues = schema.parse(requestSearchParams);
      req.query = parsedValues;
      next();
    } catch (error) {
      const errorData = parseSchemaError(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_GATEWAY,
        description: "Invalid search params",
        fields: errorData,
      });
    }
  };
}

export function getSearchParams<T>(req: Request): T {
  return req.query as T;
}
