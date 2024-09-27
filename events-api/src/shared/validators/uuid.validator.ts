import { NextFunction, Request, Response } from "express";

export function validateUUID() {
  return (req: Request, res: Response, next: NextFunction) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const eventId = req.params["eventId"];

    if (eventId && uuidRegex.test(eventId)) {
      next();
    } else {
      return res.status(400).json({
        message: "Invalid UUID",
      });
    }
  };
}
