import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "#/modules/events/dto/requests/events-search-params.dto";
import {
  EventsCreateBodyDto,
  eventsCreateBodyDtoSchema,
} from "./dto/requests/events-create.dto";
import {
  eventsUpdateBodyDtoSchema,
  EventsUpdateBodyDto,
} from "./dto/requests/events-update.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import { validateUUID } from "#/shared/validators/uuid.validator";

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
  validateRequestBody(eventsCreateBodyDtoSchema),
  async (req, res) => {
    const body = req.body as EventsCreateBodyDto;
    const newEvent = await EventsService.createEvent(body);
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent[0],
    });
  }
);

EventsController.patch(
  "/:eventId",
  validateUUID("eventId"),
  validateRequestBody(eventsUpdateBodyDtoSchema),
  async (req, res) => {
    try {
      const eventId = req.params["eventId"];
      const newData = req.body as EventsUpdateBodyDto;
      const updatedEvent = await EventsService.updateEvent(
        eventId as string,
        newData
      );
      res.status(200).json({
        message: "Event updated successfully",
        updatedEvent: updatedEvent,
      });
    } catch {
      res.status(404).json({
        message: "Event not found",
      });
    }
  }
);

EventsController.delete(
  "/:eventId",
  validateUUID("eventId"),
  async (req, res) => {
    try {
      const eventId = req.params["eventId"];
      const deletedEvent = await EventsService.deleteEvent(eventId as string);
      res.status(204).json({
        message: "Event deleted successfully",
        deletedEvent: deletedEvent, // I found out code 204 does not send response body
      });
    } catch {
      return res.status(404).json({
        message: "Event not found",
      });
    }
  }
);

EventsController.get(
  "/:eventId/tickets",
  validateUUID("eventId"),
  async (req, res) => {
    try {
      const eventId = req.params["eventId"] as string;
      const tickets = await EventsService.getTicketsOfEvent(eventId);
      res.status(200).json({
        message: "Tickets for the given event retrieved successfully",
        data: tickets,
      });
    } catch {
      return res.status(404).json({
        message: "Event not found",
      });
    }
  }
);
