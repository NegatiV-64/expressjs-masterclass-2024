import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import { TicketsBodyDataDto, ticketsBodyDataDtoSchema } from "./dto/tickets-body-data";
import { EventsService } from "../events/events.service";
import { TicketsService } from "./tickets.service";

export const TicketsController = Router();

TicketsController.get(
    "/",
    //   validateSearchParams(eventsSearchParamsDtoSchema),
    async (req, res) => {

    }
);

TicketsController.post(
    "/",
  validateRequestBody(ticketsBodyDataDtoSchema),
  async (req, res) => {
    const requestBodyTicket = req.body as unknown as TicketsBodyDataDto;

    const event = await EventsService.getEventByID(requestBodyTicket.eventId);
    if(!event){
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