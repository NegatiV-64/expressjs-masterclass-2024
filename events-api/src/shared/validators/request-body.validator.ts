import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { parseSchemaError } from "#/shared/utils";

export function validateRequestBody(
  schema: z.ZodObject<any, any> | z.ZodEffects<any, any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestBody = req.body;
      const parsedValues = schema.parse(requestBody);
      req.body = parsedValues;
      next();
    } catch (error) {
      const errorData = parseSchemaError(error);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_GATEWAY,
        description: "Invalid request body",
        fields: errorData,
      });
    }
  };
}

export function getRequestBody<T>(req: Request): T {
  return req.body as T;
}
