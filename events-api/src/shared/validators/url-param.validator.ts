import { parseSchemaError } from "#/shared/utils";
import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ZodObject } from "zod";

export function validateUrlParams(schema: ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestUrlParams = req.params;
      const parsedValues = schema.parse(requestUrlParams);
      req.params = parsedValues;
      next();
    } catch (error) {
      const errorData = parseSchemaError(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_GATEWAY,
        description: "Invalid URL params",
        fields: errorData,
      });
    }
  };
}

export function getUrlParams<T>(req: Request): T {
  return req.params as T;
}
