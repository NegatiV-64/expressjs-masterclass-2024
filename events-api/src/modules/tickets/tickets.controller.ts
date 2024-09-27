import { Router } from "express";
import { ticketsCreateRequestBodyDtoSchema } from "./dto/requests/tickets-create-request-body.dto";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { TicketsService } from "./tickets.service";
import { validateIdRouteParameter } from "#/shared/validators/route-parameter.validator";

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

TicketsController.get(
  "/:ticketId",
  validateIdRouteParameter("ticketId"),
  async (req, res) => {
    const ticket = await TicketsService.getTicket(
      req.params["ticketId"] as string,
    );

    if (!ticket) {
      res.status(404).json({
        message: "Ticket with that id does not exist",
      });
    }

    return res.status(200).json({
      message: "Ticket retrieved successfully",
      data: ticket,
    });
  },
);
