import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "#/modules/events/dto/requests/events-search-params.dto";
import { eventsCreateRequestBodyDtoSchema } from "./dto/requests/events-create-request-body.dto";
import { eventsUpdateRequestBodyDtoSchema } from "./dto/requests/events-update-request-body.dto";
import { EventsService } from "#/modules/events/events.service";
// import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { Router } from "express";
import { validateRequestBody } from "../../shared/validators/request-body.validator";
import { validateIdRouteParameter } from "../../shared/validators/route-parameter.validator";
// import { validateIdRouteParameter } from "#/shared/validators/route-parameter.validator";

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
  },
);

EventsController.post(
  "/",
  validateRequestBody(eventsCreateRequestBodyDtoSchema),
  async (req, res) => {
    const newEvent = await EventsService.createEvent(req.body);

    return res.status(201).json({
      message: "Event created successfully",
      data: newEvent,
    });
  },
);

EventsController.get(
  "/:eventId",
  validateIdRouteParameter("eventId"),
  async (req, res) => {
    const event = await EventsService.getEvent(req.params["eventId"] as string);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event retrieved successfully",
      data: event,
    });
  },
);

EventsController.patch(
  "/:eventId",
  validateIdRouteParameter("eventId"),
  validateRequestBody(eventsUpdateRequestBodyDtoSchema),
  async (req, res) => {
    const updatedEvent = await EventsService.updateEvent(
      req.body,
      req.params["eventId"] as string,
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  },
);

EventsController.delete(
  "/:eventId",
  validateIdRouteParameter("eventId"),
  async (req, res) => {
    const deletedEvent = await EventsService.deleteEvent(
      req.params["eventId"] as string,
    );

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // the status code is 200 because with 204 I cannot return the deletedEvent and follow the task requirements
    return res.status(200).json({
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  },
);

EventsController.get(
  "/:eventId/tickets",
  validateIdRouteParameter("eventId"),
  async (req, res) => {
    const tickets = await EventsService.getTickets(
      req.params["eventId"] as string,
    );

    if (tickets === null) {
      res.status(400).json({
        message: "Event with that id does not exist",
      });
    }

    return res.status(200).json({
      message: "Tickets retrieved successfully",
      data: tickets,
    });
  },
);
