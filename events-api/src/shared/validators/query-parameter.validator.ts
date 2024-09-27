import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function validateQueryParameter(
    param: string,
    schema: z.ZodString
) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const val = req.params[param];
            const parsedValue = schema.parse(val);
            req.params[param] = parsedValue;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map(
                    (error) => error.message
                );

                return res.status(400).json({
                    message: "Bad Request",
                    errors: errorMessages
                });
            }

            return res.status(400).json({
                message: "Bad Request",
                errors: ["Invalid Param"]
            });
        }
    };
}
