import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import { TicketsBodyDataDto, ticketsBodyDataDtoSchema } from "./dto/tickets-body-data";
import { EventsService } from "../events/events.service";
import { TicketsService } from "./tickets.service";
import { eventIDSchema } from "../events/dto/requests/events-update-data.dto";
import { ZodError } from "zod";

export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(ticketsBodyDataDtoSchema),
  async (req, res) => {
    const requestBodyTicket = req.body as unknown as TicketsBodyDataDto;

    const event = await EventsService.getEventByID(requestBodyTicket.eventId);
    if (!event) {
      return res.status(400).json({
        message: "Event does not exist"
      })
    }

    const ticket = await TicketsService.newTicket(requestBodyTicket)

    return res.status(201).json({
      message: "Ticked created successfully",
      data: ticket
    });
  }
);

TicketsController.get(
  "/:ticketId",
  async (req, res) => {
    try {
      const ticketID = eventIDSchema.parse(req.params['ticketId']) as string;

      const ticket = await TicketsService.getTicketById(ticketID);

      return res.status(200).json({
        message: "Ticket retrieved successfully",
        data: ticket
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((error) => error.message);

        return res.status(400).json({
          message: "Bad Request",
          errors: errorMessages,
        });
      }

      return res.status(400).json({
        message: "Bad Request"
      });
    }
  }
);