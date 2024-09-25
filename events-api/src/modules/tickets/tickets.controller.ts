import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import { ticketsCreateDtoSchema } from "./dto/requests/tickets-create-dto";
import { TicketsService } from "./tickets.service";
import { validateRouteParams } from "#/shared/validators/route-params.validator";
import { eventsRouteParamsDtoSchema } from "../events/dto/requests/events-route-params.dto";

export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(ticketsCreateDtoSchema),
  async (req, res) => {
    await TicketsService.createTicket(req.body);

    return res.status(201).json({
      message: "Tickets created successfully",
    });
  }
);

TicketsController.get(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    const ticket = await TicketsService.getTicket(req.params["id"] as string);

    return res.status(201).json({
      message: "Ticket retrieved successfully",
      data: ticket,
    });
  }
);
