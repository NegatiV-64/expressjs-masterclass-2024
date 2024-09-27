import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import {
  TicketsCreateBodyDto,
  ticketsCreateBodyDtoSchema,
} from "./dto/requests/tickets-create.dto";
import { TicketsService } from "./tickets.service";
import { validateUUID } from "#/shared/validators/uuid.validator";
import { EventsService } from "../events/events.service";

export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(ticketsCreateBodyDtoSchema),
  async (req, res) => {
    try {
      const ticketData = req.body as TicketsCreateBodyDto;
      const newTicket = await TicketsService.createTicket(ticketData);
      res.status(201).json({
        message: "Ticket created successfully",
        ticket: newTicket[0],
      });
    } catch {
      return res.status(404).json({
        message: "Event not found",
      });
    }
  }
);

TicketsController.get(
  "/:ticketId",
  validateUUID("ticketId"),
  async (req, res) => {
    try {
      const ticketId = req.params["ticketId"] as string;
      const ticket = await TicketsService.getOneTicket(ticketId);

      // Not proud of this but had to do to satisfy typescript
      // because I know ticket[0] cannot be undefined here (I hope)
      let event = {};
      if (ticket[0]) {
        const eventId = ticket[0].eventId;
        event = await EventsService.getOneEvent(eventId);
      }

      res.status(200).json({
        message: "Ticket and related event retrieved successfully",
        ticket: ticket[0],
        event: event,
      });
    } catch {
      res.status(404).json({
        message: "Ticket not found",
      });
    }
  }
);
