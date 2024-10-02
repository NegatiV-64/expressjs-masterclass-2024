import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function validateQueryParameter(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedValue = schema.parse(req.params);
            req.params = parsedValue;

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
