import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import { ticketsCreateDtoSchema } from "./dto/requests/tickets-create-dto";
import { TicketsService } from "./tickets.service";
import { validateRouteParams } from "#/shared/validators/route-params.validator";
import { eventsRouteParamsDtoSchema } from "../events/dto/requests/events-route-params.dto";
import { getIdParam } from "#/shared/utils";

export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(ticketsCreateDtoSchema),
  async (req, res) => {
    const ticket = await TicketsService.createTicket(req.body);

    return res.status(201).json({
      message: "Tickets created successfully",
      data: ticket,
    });
  }
);

TicketsController.get(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    const ticket = await TicketsService.getTicket(getIdParam(req.params));

    return res.status(200).json({
      message: "Ticket retrieved successfully",
      data: ticket,
    });
  }
);
