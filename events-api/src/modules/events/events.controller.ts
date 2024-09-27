import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "#/modules/events/dto/requests/events-search-params.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateReqBody } from "#/shared/validators/request-body.validator";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { Router } from "express";
import { eventsReqBodyDtoSchema } from "./dto/requests/events-req-body.dto";
import { eventsIdDtoSchema } from "./dto/requests/event-id.dto";
import { eventsUpdateReqBodyDtoSchema } from "./dto/requests/eventUpdateReqBody.dto";
import { validateId } from "#/shared/validators/id-check.valildator";

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

EventsController.get(
  "/:eventId/tickets",
  validateId(eventsIdDtoSchema),
  async (req, res) => {
    const eventId = req.params["eventId"] as string;

    const tickets = await EventsService.getEventTickets(eventId);

    return res.status(200).json({
      message: "Tickets retrieved successfully for single event",
      data: tickets,
    });
  }
);

EventsController.post(
  "/",
  validateReqBody(eventsReqBodyDtoSchema),
  async (req, res) => {
    const event = req.body;

    const createdEvent = await EventsService.createEvent(event);

    return res.status(201).json({
      message: "Event created successfully",
      data: createdEvent,
    });
  }
);

EventsController.patch(
  "/:eventId",
  validateId(eventsIdDtoSchema),
  validateReqBody(eventsUpdateReqBodyDtoSchema),
  async (req, res) => {
    const eventId = req.params["eventId"] as string;
    const event = req.body;

    const updatedEvent = await EventsService.updateEvent(eventId, event);

    return res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  }
);

EventsController.delete(
  "/:eventId",
  validateId(eventsIdDtoSchema),
  async (req, res) => {
    const eventId = req.params["eventId"] as string;

    await EventsService.deleteEvent(eventId);

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  }
);
