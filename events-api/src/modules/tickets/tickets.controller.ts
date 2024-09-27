import { Router } from "express";
import { TicketsService } from "./tickets.service";
import { validateReqBody } from "#/shared/validators/request-body.validator";
import { ticketReqBodyDtoSchema } from "./requests/ticket-req-body.dto";
import { notFoundMiddleware } from "#/shared/middlewares/not-found.middleware";
import { validateId } from "#/shared/validators/id-check.valildator";
import { ticketIdDtoSchema } from "./requests/ticket-id.dto";

export const TicketController = Router();

TicketController.get(
  "/:ticketId",
  validateId(ticketIdDtoSchema),
  async (req, res) => {
    const ticketId = req.params["ticketId"] as string;

    const ticket = await TicketsService.getOne(ticketId);

    if (!ticket) {
      return notFoundMiddleware(req, res);
    }

    return res.status(200).json({
      message: "Ticket retrieved successfully",
      data: ticket,
    });
  }
);

TicketController.post(
  "/",
  validateReqBody(ticketReqBodyDtoSchema),
  async (req, res) => {
    const ticket = req.body;

    const createdTicket = await TicketsService.createTicket(ticket);

    return res.status(201).json({
      message: "Ticket created successfully",
      data: createdTicket,
    });
  }
);
