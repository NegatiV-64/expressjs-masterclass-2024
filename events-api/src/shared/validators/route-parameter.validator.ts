import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

const idRouteParameterSchema = z
  .string()
  .uuid({ message: "ID is not a valid uuid" });

export function validateIdRouteParameter(param: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[param];
      const parsedId = idRouteParameterSchema.parse(id);
      req.params[param] = parsedId;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((error) => error.message);

        return res.status(400).json({
          message: "Bad Request",
          errors: errorMessages,
        });
      }

      return res.status(400).json({
        message: "Bad Request",
        errors: ["Invalid Id"],
      });
    }
  };
}
