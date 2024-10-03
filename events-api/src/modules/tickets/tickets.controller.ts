import { Router } from "express";
import {
  TicketsCreateRequestBodyDto,
  ticketsCreateRequestBodyDtoSchema,
} from "./dto/requests/tickets-create-request-body.dto";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { TicketsService } from "./tickets.service";
import { validateIdRouteParameter } from "#/shared/validators/route-parameter.validator";
import "express-async-errors";

export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(ticketsCreateRequestBodyDtoSchema),
  async (req, res) => {
    const newTicket = await TicketsService.createTicket(
      req.body as unknown as TicketsCreateRequestBodyDto,
    );

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

    return res.status(200).json({
      message: "Ticket retrieved successfully",
      data: ticket,
    });
  },
);
