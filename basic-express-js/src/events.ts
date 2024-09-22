import { Router, Request, Response } from "express";
import { client } from "./database";

export const eventsRouter = Router();

eventsRouter.use((_req: Request, res: Response, next: Function) => {
  res.setHeader("x-subroute", "events");

  next();
});

eventsRouter.get("/", async (req: Request, res: Response) => {
  const searchParams = req.query;
  const page = Number(searchParams["page"] || 1);
  const limit = Number(searchParams["limit"] || 10);

  const [events] = await client.query(
    `
    SELECT * FROM events
    LIMIT ?
    OFFSET ?;
  `,
    {
      replacements: [limit, (page - 1) * limit],
    }
  );

  res.status(200).json({
    message: "Events retrieved successfully",
    data: events,
  });
});

eventsRouter.get("/:eventId", async (req: Request, res: Response) => {
  const eventId = req.params["eventId"];

  if (!eventId) {
    res.status(400).json({
      message: "Event ID is required",
    });
  }

  const [events] = await client.query(
    "SELECT * FROM events WHERE event_id = ?",
    {
      replacements: [eventId],
    }
  );
  const event = events[0];

  if (!event) {
    return res.status(404).json({
      message: "Event not found",
    });
  }

  return res.status(200).json({
    message: "Event retrieved successfully",
    data: event,
  });
});
