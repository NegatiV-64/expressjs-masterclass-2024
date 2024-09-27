import { Router } from "express";
import { ticketsCreateRequestBodyDtoSchema } from "./dto/requests/tickets-create-request-body.dto";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { TicketsService } from "./tickets.service";

export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(ticketsCreateRequestBodyDtoSchema),
  async (req, res) => {
    const newTicket = await TicketsService.createTicket(req.body);

    if (!newTicket) {
      res.status(400).json({
        message: "Event with that id does not exist",
      });
    }

    return res.status(201).json({
      message: "Ticket created successfully",
      data: newTicket,
    });
  },
);
