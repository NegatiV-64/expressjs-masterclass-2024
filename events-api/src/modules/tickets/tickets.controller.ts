import {
  CreateTicketDto,
  createTicketDtoSchema,
} from "#/modules/tickets/dto/requests";
import {
  TicketIdParamDto,
  ticketIdParamSchema,
} from "#/modules/tickets/dto/requests/ticket-id-param.dto";
import { TicketsService } from "#/modules/tickets/tickets.service";
import { requestHandler } from "#/shared/utils";
import {
  getRequestBody,
  getUrlParams,
  validateRequestBody,
  validateUrlParams,
} from "#/shared/validators";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(createTicketDtoSchema),
  requestHandler(async (req, res) => {
    const dto = getRequestBody<CreateTicketDto>(req);

    const createdTicket = await TicketsService.createTicket(dto);

    return res.status(StatusCodes.CREATED).json({
      message: "Ticket created successfully",
      data: createdTicket,
    });
  })
);

TicketsController.get(
  "/:ticketId",
  validateUrlParams(ticketIdParamSchema),
  requestHandler(async (req, res) => {
    const { ticketId } = getUrlParams<TicketIdParamDto>(req);

    const ticket = await TicketsService.getTicket(ticketId);

    return res.status(StatusCodes.OK).json({
      message: "Ticket retrieved successfully",
      data: ticket,
    });
  })
);
