import express from "express";
import cors from "cors";
import { loggerMiddleware } from "#/shared/middlewares/logger.middleware";
import { errorMiddleware } from "#/shared/middlewares/error.middleware";
import { notFoundMiddleware } from "#/shared/middlewares/not-found.middleware";
import { EventsController } from "#/modules/events/events.controller";
import { TicketsController } from "#/modules/tickets/tickets.controller";

export const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use("/events", EventsController);
app.use("/tickets", TicketsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
