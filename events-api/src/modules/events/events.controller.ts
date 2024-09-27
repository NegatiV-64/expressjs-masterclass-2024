import { EventsSearchParamsDto, eventsSearchParamsDtoSchema, } from "#/modules/events/dto/requests/events-search-params.dto";
import { EventsBodyDataDto, eventsBodyDataDtoSchema, } from "#/modules/events/dto/requests/events-body-data.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { eventIDSchema, EventsUpdateDto, eventsUpdateDtoSchema } from "./dto/requests/events-update-data.dto";
import { Router } from "express";
import { z, ZodError } from "zod";
import { TicketsService } from "../tickets/tickets.service";

export const EventsController = Router();

EventsController.get(
  "/",
  validateSearchParams(eventsSearchParamsDtoSchema),
  async (req, res) => {
    const searchParams = req.query as unknown as EventsSearchParamsDto;

    const events = await EventsService.getEvents();

    return res.status(200).json({
      message: "Events retrieved successfully",
      data: events,
      searchParams,
    });
  }
);

EventsController.post(
  "/",
  validateRequestBody(eventsBodyDataDtoSchema),
  async (req, res) => {
    const requestBody = req.body as unknown as EventsBodyDataDto;

    const event = await EventsService.newEvent(requestBody);

    return res.status(201).json({
      message: "Event created successfully",
      data: event,
      requestBody,
    });
  }
);

EventsController.patch(
  "/:eventId",
  validateSearchParams(eventsUpdateDtoSchema),
  async (req, res) => {
    const getEventID = eventIDSchema.parse(req.params['eventId']) as string;
    const requestBody = req.body as unknown as EventsUpdateDto;

    const updatedEvent = await EventsService.updateEvent(getEventID, requestBody);

    return res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent
    });
  }
);

EventsController.delete(
  "/:eventId",
  async (req, res) => {
    try {
      const eventID = eventIDSchema.parse(req.params['eventId']) as string;
      const deletedEvent = await EventsService.deleteEvent(eventID);
      console.log(deletedEvent);
      return res.status(204).json({
        message: "Event deleted successfully",
        data: deletedEvent
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid UUID", errors: error.errors });
      }
    }
  }
);

EventsController.get(
  "/:eventId/tickets",
  async (req, res) => {
    try {
      const eventID = eventIDSchema.parse(req.params['eventId']) as string;

      const tickets = await TicketsService.getEventTickets(eventID);

      return res.status(200).json({
        message: "Tickets retrieved successfully",
        data: tickets
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