import { TicketsCreateDto, ticketsCreateDtoSchema } from './dto/requests/tickets-create.dto';
import { TicketsRouteParamsDto, ticketsRouteParamsDtoSchema } from './dto/requests/tickets-route-params.dto';
import { TicketsService } from "#/modules/tickets/tickets.service";
import { validateRouteParams } from "#/shared/validators/route-params.validator";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";

export const TicketsController = Router();

TicketsController.get(
  "/",
  async (req, res) => {
    const tickets = await TicketsService.getTickets();

    return res.status(200).json({
      message: "Tickets retrieved successfully",
      data: tickets,
    });
  }
);

TicketsController.get(
  "/:id",
  validateRouteParams(ticketsRouteParamsDtoSchema),
  async (req, res) => {
    const routeParams = req.params as unknown as TicketsRouteParamsDto;

    const ticket = await TicketsService.getTicketById(routeParams.id);

    return res.status(200).json({
      message: "Ticket retrieved successfully",
      data: ticket
    });
  }
);

TicketsController.post(
  "/",
  validateRequestBody(ticketsCreateDtoSchema),
  async (req, res) => {
    const bodyParams = req.body as unknown as TicketsCreateDto;

    const tickets = await TicketsService.createTicket(bodyParams);

    return res.status(201).json({
      message: "Ticket created successfully",
      data: tickets,
      bodyParams,
    });
  }
)