import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import { ticketsCreateDtoSchema } from "./dto/requests/tickets-create-dto";
import { TicketsService } from "./tickets.service";
import { validateRouteParams } from "#/shared/validators/route-params.validator";
import { eventsRouteParamsDtoSchema } from "../events/dto/requests/events-route-params.dto";
import { getIdParam } from "#/shared/utils";
import { NotFoundError } from "#/shared/errors/notFoundError";

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

TicketsController.get("/", async (req, res) => {
  try {
    const tickets = await TicketsService.getAllTickets();
    return res.status(200).json({
      message: "Tickets retrieved successfully",
      data: tickets,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

TicketsController.get(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    try {
      const ticket = await TicketsService.getTicket(getIdParam(req.params));
      return res.status(200).json({
        message: "Ticket retrieved successfully",
        data: ticket,
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
      }
    }
  }
);
